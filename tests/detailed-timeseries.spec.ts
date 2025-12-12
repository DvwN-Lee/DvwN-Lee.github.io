import { test, expect } from './fixtures/base-fixture';

test.describe('상세 시계열 레이아웃 변화 분석', () => {
    test('첫 로딩 vs 새로고침 상세 비교', async ({ page }) => {
        console.log('\n=== 1단계: 첫 로딩 시 시계열 데이터 수집 ===');

        // 첫 로딩
        await page.goto('http://localhost:8080/#projects', { waitUntil: 'domcontentloaded' });

        const firstLoadData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{ index: number; title: string; y: number }>;
            }> = [];

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));

                snapshots.push({
                    time: elapsed,
                    cards: cards.map((card, idx) => {
                        const el = card as HTMLElement;
                        const title = el.querySelector('h3')?.textContent || '';

                        let offsetTop = 0;
                        let element: HTMLElement | null = el;
                        while (element) {
                            offsetTop += element.offsetTop;
                            element = element.offsetParent as HTMLElement | null;
                        }

                        return {
                            index: idx,
                            title: title.substring(0, 40),
                            y: Math.round(offsetTop)
                        };
                    })
                });
            };

            // 0ms부터 2000ms까지 50ms 간격으로 측정
            for (let ms = 0; ms <= 2000; ms += 50) {
                await new Promise(resolve => setTimeout(resolve, ms === 0 ? 0 : 50));
                captureSnapshot(ms);
            }

            return snapshots;
        });

        console.log('\n=== 첫 로딩 시계열 데이터 (Card 3, 4만 출력) ===');
        firstLoadData.forEach(snapshot => {
            const card3 = snapshot.cards[3];
            const card4 = snapshot.cards[4];
            if (card3 && card4) {
                console.log(`${snapshot.time}ms: Card3=${card3.y}, Card4=${card4.y}`);
            }
        });

        // 2. "실시간 마이크로서비스 모니터링 플랫폼" 카드로 스크롤
        console.log('\n=== 2단계: 모니터링 플랫폼 카드로 스크롤 ===');

        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });
        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000); // 스크롤 안정화

        // 3. 새로고침 전 위치 기록
        const beforeReload = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));
            return cards.map((card, idx) => {
                const el = card as HTMLElement;
                let offsetTop = 0;
                let element: HTMLElement | null = el;
                while (element) {
                    offsetTop += element.offsetTop;
                    element = element.offsetParent as HTMLElement | null;
                }
                return { index: idx, y: Math.round(offsetTop) };
            });
        });

        console.log('\n=== 새로고침 전 위치 ===');
        console.log(`Card 3: y=${beforeReload[3].y}`);
        console.log(`Card 4: y=${beforeReload[4].y}`);

        // 4. 새로고침 및 시계열 데이터 수집
        console.log('\n=== 3단계: 새로고침 후 시계열 데이터 수집 ===');

        await page.reload({ waitUntil: 'domcontentloaded' });

        const reloadData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{ index: number; title: string; y: number }>;
            }> = [];

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));

                snapshots.push({
                    time: elapsed,
                    cards: cards.map((card, idx) => {
                        const el = card as HTMLElement;
                        const title = el.querySelector('h3')?.textContent || '';

                        let offsetTop = 0;
                        let element: HTMLElement | null = el;
                        while (element) {
                            offsetTop += element.offsetTop;
                            element = element.offsetParent as HTMLElement | null;
                        }

                        return {
                            index: idx,
                            title: title.substring(0, 40),
                            y: Math.round(offsetTop)
                        };
                    })
                });
            };

            // 0ms부터 2000ms까지 50ms 간격으로 측정
            for (let ms = 0; ms <= 2000; ms += 50) {
                await new Promise(resolve => setTimeout(resolve, ms === 0 ? 0 : 50));
                captureSnapshot(ms);
            }

            return snapshots;
        });

        console.log('\n=== 새로고침 후 시계열 데이터 (Card 3, 4만 출력) ===');
        reloadData.forEach(snapshot => {
            const card3 = snapshot.cards[3];
            const card4 = snapshot.cards[4];
            if (card3 && card4) {
                console.log(`${snapshot.time}ms: Card3=${card3.y}, Card4=${card4.y}`);
            }
        });

        // 5. 비교 분석
        console.log('\n=== 4단계: 첫 로딩 vs 새로고침 비교 ===');

        const card3FirstLoad = firstLoadData.map(s => s.cards[3]?.y).filter(y => y !== undefined);
        const card3Reload = reloadData.map(s => s.cards[3]?.y).filter(y => y !== undefined);
        const card4FirstLoad = firstLoadData.map(s => s.cards[4]?.y).filter(y => y !== undefined);
        const card4Reload = reloadData.map(s => s.cards[4]?.y).filter(y => y !== undefined);

        const card3FirstFinal = card3FirstLoad[card3FirstLoad.length - 1];
        const card3ReloadFinal = card3Reload[card3Reload.length - 1];
        const card4FirstFinal = card4FirstLoad[card4FirstLoad.length - 1];
        const card4ReloadFinal = card4Reload[card4Reload.length - 1];

        console.log(`\nCard 3 최종 위치:`);
        console.log(`  첫 로딩: y=${card3FirstFinal}`);
        console.log(`  새로고침: y=${card3ReloadFinal}`);
        console.log(`  차이: ${Math.abs(card3FirstFinal - card3ReloadFinal)}px`);

        console.log(`\nCard 4 최종 위치:`);
        console.log(`  첫 로딩: y=${card4FirstFinal}`);
        console.log(`  새로고침: y=${card4ReloadFinal}`);
        console.log(`  차이: ${Math.abs(card4FirstFinal - card4ReloadFinal)}px`);

        // 6. 시간에 따른 변화 횟수 분석
        console.log('\n=== 5단계: 위치 변화 횟수 분석 ===');

        const countChanges = (data: number[]) => {
            let changes = 0;
            for (let i = 1; i < data.length; i++) {
                if (Math.abs(data[i] - data[i - 1]) > 5) {
                    changes++;
                }
            }
            return changes;
        };

        console.log(`\nCard 3 위치 변화 횟수:`);
        console.log(`  첫 로딩: ${countChanges(card3FirstLoad)}회`);
        console.log(`  새로고침: ${countChanges(card3Reload)}회`);

        console.log(`\nCard 4 위치 변화 횟수:`);
        console.log(`  첫 로딩: ${countChanges(card4FirstLoad)}회`);
        console.log(`  새로고침: ${countChanges(card4Reload)}회`);

        // 7. 문제 진단
        const card3Diff = Math.abs(card3FirstFinal - card3ReloadFinal);
        const card4Diff = Math.abs(card4FirstFinal - card4ReloadFinal);

        if (card3Diff > 10 || card4Diff > 10) {
            console.log(`\n⚠️  문제 발견: 첫 로딩과 새로고침 시 최종 위치가 다름`);
            console.log(`  Card 3 차이: ${card3Diff}px`);
            console.log(`  Card 4 차이: ${card4Diff}px`);
        } else {
            console.log(`\n✅ 레이아웃 일관성: 첫 로딩과 새로고침 시 동일한 최종 위치`);
        }
    });
});
