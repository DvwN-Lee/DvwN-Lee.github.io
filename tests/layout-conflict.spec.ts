import { test, expect } from './fixtures/base-fixture';

test.describe('페이지 새로고침 시 정렬 충돌 분석', () => {
    test('초기 로딩 시 카드 위치 변화 추적', async ({ page }) => {
        console.log('\n=== 페이지 새로고침 시 레이아웃 변화 측정 ===');

        // 페이지 로딩 시작
        const startTime = Date.now();
        await page.goto('http://localhost:8080/#projects', { waitUntil: 'domcontentloaded' });

        // 여러 시점에서 카드 위치 측정
        const tracking = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{
                    index: number;
                    title: string;
                    viewportX: number;
                    viewportY: number;
                    absoluteX: number;
                    absoluteY: number;
                    display: string;
                    visibility: string;
                }>;
                gridClass: string;
                scrollY: number;
            }> = [];

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const grid = document.querySelector('.projects-grid');

                snapshots.push({
                    time: elapsed,
                    cards: cards.map((card, idx) => {
                        const el = card as HTMLElement;
                        const rect = el.getBoundingClientRect();
                        const title = el.querySelector('h3')?.textContent || '';
                        const computed = window.getComputedStyle(el);

                        // 문서 기준 절대 좌표 계산
                        let offsetTop = 0;
                        let offsetLeft = 0;
                        let element: HTMLElement | null = el;
                        while (element) {
                            offsetTop += element.offsetTop;
                            offsetLeft += element.offsetLeft;
                            element = element.offsetParent as HTMLElement | null;
                        }

                        return {
                            index: idx,
                            title: title.substring(0, 30),
                            viewportX: Math.round(rect.x * 10) / 10,
                            viewportY: Math.round(rect.y * 10) / 10,
                            absoluteX: Math.round(offsetLeft * 10) / 10,
                            absoluteY: Math.round(offsetTop * 10) / 10,
                            display: computed.display,
                            visibility: computed.visibility
                        };
                    }),
                    gridClass: grid?.className || '',
                    scrollY: window.scrollY
                });
            };

            // 초기 상태 (0ms)
            captureSnapshot(0);

            // 여러 시점에서 측정
            const intervals = [50, 100, 200, 300, 500, 800, 1000, 1500, 2000];
            for (const ms of intervals) {
                await new Promise(resolve => setTimeout(resolve, ms));
                captureSnapshot(ms);
            }

            return snapshots;
        });

        console.log('\n=== 카드 위치 변화 타임라인 ===');

        // 각 시점의 카드 위치 출력
        for (let i = 0; i < tracking.length; i++) {
            const snapshot = tracking[i];
            console.log(`\n${snapshot.time}ms - ScrollY: ${snapshot.scrollY.toFixed(1)}, Grid: ${snapshot.gridClass.includes('masonry-ready') ? 'READY' : 'NOT-READY'}`);

            // 처음 3개 카드만 출력 (Featured 카드들)
            for (let j = 0; j < Math.min(3, snapshot.cards.length); j++) {
                const card = snapshot.cards[j];
                console.log(`  Card ${card.index}: "${card.title}"`);
                console.log(`    문서 기준: (${card.absoluteX}, ${card.absoluteY})`);
                console.log(`    뷰포트 기준: (${card.viewportX}, ${card.viewportY})`);
            }
        }

        // 위치 변화 분석 (절대 좌표 기준)
        console.log('\n=== 절대 좌표 위치 변화 분석 ===');

        // 각 카드의 위치가 변경된 횟수 계산
        for (let cardIdx = 0; cardIdx < 3; cardIdx++) {
            const positions: Array<{ time: number; x: number; y: number }> = [];

            for (const snapshot of tracking) {
                if (snapshot.cards[cardIdx]) {
                    const card = snapshot.cards[cardIdx];
                    positions.push({
                        time: snapshot.time,
                        x: card.absoluteX,
                        y: card.absoluteY
                    });
                }
            }

            // 위치 변화 감지
            const changes: Array<{ from: number; to: number; xDiff: number; yDiff: number }> = [];
            for (let i = 1; i < positions.length; i++) {
                const prev = positions[i - 1];
                const curr = positions[i];
                const xDiff = Math.abs(curr.x - prev.x);
                const yDiff = Math.abs(curr.y - prev.y);

                if (xDiff > 5 || yDiff > 5) {
                    changes.push({
                        from: prev.time,
                        to: curr.time,
                        xDiff,
                        yDiff
                    });
                }
            }

            if (changes.length > 0) {
                console.log(`\nCard ${cardIdx} 절대 위치 변화: ${changes.length}회`);
                changes.forEach((change, idx) => {
                    console.log(`  Change ${idx + 1}: ${change.from}ms → ${change.to}ms (Δx=${change.xDiff.toFixed(1)}, Δy=${change.yDiff.toFixed(1)})`);
                });
            } else {
                console.log(`\nCard ${cardIdx}: 절대 위치 변화 없음 ✅`);
            }
        }

        // masonry-ready 클래스가 추가되는 시점 확인
        const masonryReadyTime = tracking.findIndex(s => s.gridClass.includes('masonry-ready'));
        if (masonryReadyTime !== -1) {
            console.log(`\n✅ masonry-ready 클래스 추가 시점: ${tracking[masonryReadyTime].time}ms`);
        } else {
            console.log(`\n⚠️  masonry-ready 클래스가 추가되지 않음`);
        }

        // 문제 진단
        const hasLayoutShift = tracking.some((snapshot, idx) => {
            if (idx === 0) return false;
            const prev = tracking[idx - 1];
            return snapshot.cards.some((card, cardIdx) => {
                const prevCard = prev.cards[cardIdx];
                if (!prevCard) return false;
                const xDiff = Math.abs(card.x - prevCard.x);
                const yDiff = Math.abs(card.y - prevCard.y);
                return (xDiff > 5 || yDiff > 5) && snapshot.gridClass.includes('masonry-ready');
            });
        });

        console.log('\n=== 문제 진단 ===');
        if (hasLayoutShift) {
            console.log('⚠️  문제 발견: Masonry 초기화 후에도 레이아웃이 변경됨');
        } else {
            console.log('✅ 레이아웃 안정적: Masonry 초기화 후 위치 변화 없음');
        }
    });
});
