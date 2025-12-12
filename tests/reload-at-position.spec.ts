import { test, expect } from './fixtures/base-fixture';

test.describe('특정 카드 위치에서 새로고침 시 레이아웃 변화 측정', () => {
    test('실시간 마이크로서비스 모니터링 플랫폼 카드 위치에서 새로고침', async ({ page }) => {
        console.log('\n=== 테스트 시작: 실시간 마이크로서비스 모니터링 플랫폼 위치에서 새로고침 ===');

        // 1. 페이지 로드 및 Masonry 초기화 대기
        await page.goto('http://localhost:8080/#projects', { waitUntil: 'networkidle' });
        await page.waitForSelector('.masonry-ready', { timeout: 5000 });

        console.log('\n=== 초기 로딩 완료 ===');

        // 2. "실시간 마이크로서비스 모니터링 플랫폼" 카드 찾기 및 스크롤
        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });

        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500); // 스크롤 안정화

        // 3. 새로고침 전 모든 카드 위치 기록
        const beforeReload = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));
            return cards.map((card, idx) => {
                const el = card as HTMLElement;
                const title = el.querySelector('h3')?.textContent || '';

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
                    title: title.substring(0, 40),
                    absoluteX: Math.round(offsetLeft),
                    absoluteY: Math.round(offsetTop)
                };
            });
        });

        const scrollYBefore = await page.evaluate(() => window.scrollY);

        console.log('\n=== 새로고침 전 상태 ===');
        console.log(`스크롤 위치: ${scrollYBefore.toFixed(1)}`);
        beforeReload.forEach(card => {
            console.log(`  Card ${card.index}: "${card.title}" at (${card.absoluteX}, ${card.absoluteY})`);
        });

        // 4. 페이지 새로고침
        console.log('\n=== 페이지 새로고침 시작 ===');

        await page.reload({ waitUntil: 'domcontentloaded' });

        const afterReload = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{
                    index: number;
                    title: string;
                    absoluteX: number;
                    absoluteY: number;
                    viewportY: number;
                }>;
                scrollY: number;
                gridClass: string;
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
                            title: title.substring(0, 40),
                            absoluteX: Math.round(offsetLeft),
                            absoluteY: Math.round(offsetTop),
                            viewportY: Math.round(rect.y * 10) / 10
                        };
                    }),
                    scrollY: Math.round(window.scrollY),
                    gridClass: grid?.className || ''
                });
            };

            // 여러 시점에서 측정
            const intervals = [0, 50, 100, 200, 300, 500, 800, 1000, 1500];
            for (const ms of intervals) {
                await new Promise(resolve => setTimeout(resolve, ms));
                captureSnapshot(ms);
            }

            return snapshots;
        });

        console.log('\n=== 새로고침 후 레이아웃 변화 타임라인 ===');

        for (const snapshot of afterReload) {
            console.log(`\n${snapshot.time}ms - ScrollY: ${snapshot.scrollY}, Grid: ${snapshot.gridClass.includes('masonry-ready') ? 'READY' : 'NOT-READY'}`);

            // 모든 카드 출력
            snapshot.cards.forEach(card => {
                console.log(`  Card ${card.index}: "${card.title}"`);
                console.log(`    절대: (${card.absoluteX}, ${card.absoluteY}), 뷰포트Y: ${card.viewportY}`);
            });
        }

        // 레이아웃 변화 분석
        console.log('\n=== 레이아웃 변화 분석 ===');

        for (let cardIdx = 0; cardIdx < beforeReload.length; cardIdx++) {
            const before = beforeReload[cardIdx];
            const after0ms = afterReload[0]?.cards[cardIdx];
            const afterFinal = afterReload[afterReload.length - 1]?.cards[cardIdx];

            if (!after0ms || !afterFinal) continue;

            const change0ms = {
                xDiff: Math.abs(after0ms.absoluteX - before.absoluteX),
                yDiff: Math.abs(after0ms.absoluteY - before.absoluteY)
            };

            const changeFinal = {
                xDiff: Math.abs(afterFinal.absoluteX - before.absoluteX),
                yDiff: Math.abs(afterFinal.absoluteY - before.absoluteY)
            };

            if (change0ms.xDiff > 5 || change0ms.yDiff > 5 || changeFinal.xDiff > 5 || changeFinal.yDiff > 5) {
                console.log(`\n⚠️  Card ${cardIdx} "${before.title}" 위치 변화 감지:`);
                console.log(`  새로고침 전: (${before.absoluteX}, ${before.absoluteY})`);
                console.log(`  새로고침 후 0ms: (${after0ms.absoluteX}, ${after0ms.absoluteY}) - Δ(${change0ms.xDiff}, ${change0ms.yDiff})`);
                console.log(`  최종 안정화: (${afterFinal.absoluteX}, ${afterFinal.absoluteY}) - Δ(${changeFinal.xDiff}, ${changeFinal.yDiff})`);
            }
        }

        // 새로고침 후 내부 레이아웃 변화 분석
        console.log('\n=== 새로고침 후 시간에 따른 레이아웃 변화 ===');

        for (let cardIdx = 0; cardIdx < 6; cardIdx++) {
            const changes: Array<{ from: number; to: number; yDiff: number }> = [];

            for (let i = 1; i < afterReload.length; i++) {
                const prev = afterReload[i - 1].cards[cardIdx];
                const curr = afterReload[i].cards[cardIdx];

                if (!prev || !curr) continue;

                const yDiff = Math.abs(curr.absoluteY - prev.absoluteY);

                if (yDiff > 10) {
                    changes.push({
                        from: afterReload[i - 1].time,
                        to: afterReload[i].time,
                        yDiff
                    });
                }
            }

            if (changes.length > 0) {
                console.log(`\n⚠️  Card ${cardIdx} 새로고침 후 위치 변화: ${changes.length}회`);
                changes.forEach((change, idx) => {
                    console.log(`  Change ${idx + 1}: ${change.from}ms → ${change.to}ms (Δy=${change.yDiff}px)`);
                });
            }
        }
    });
});
