import { test, expect } from './fixtures/base-fixture';

test.describe('초정밀 시계열 레이아웃 변화 분석', () => {
    test('10ms 간격, 3초 측정 + DOM 변화 추적', async ({ page }) => {
        console.log('\n=== 1단계: 첫 로딩 시 초정밀 시계열 데이터 수집 ===');

        await page.goto('http://localhost:8080/#projects', { waitUntil: 'domcontentloaded' });

        const firstLoadData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{ index: number; title: string; y: number; height: number }>;
                masonryClass: string;
            }> = [];

            const domMutations: Array<{ time: number; type: string; detail: string }> = [];

            // MutationObserver로 DOM 변화 추적
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const elapsed = performance.now();
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target as HTMLElement;
                        if (target.classList.contains('project-card')) {
                            const title = target.querySelector('h3')?.textContent || '';
                            domMutations.push({
                                time: Math.round(elapsed),
                                type: 'style',
                                detail: `Card: ${title.substring(0, 20)}`
                            });
                        }
                    } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target as HTMLElement;
                        if (target.id === 'masonry-grid') {
                            domMutations.push({
                                time: Math.round(elapsed),
                                type: 'grid-class',
                                detail: target.className
                            });
                        }
                    }
                });
            });

            const grid = document.getElementById('masonry-grid');
            if (grid) {
                observer.observe(grid, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['style', 'class']
                });
            }

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const grid = document.getElementById('masonry-grid');

                snapshots.push({
                    time: elapsed,
                    masonryClass: grid?.className || '',
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
                            y: Math.round(offsetTop),
                            height: Math.round(el.offsetHeight)
                        };
                    })
                });
            };

            // 10ms 간격으로 3000ms까지 측정
            for (let ms = 0; ms <= 3000; ms += 10) {
                await new Promise(resolve => setTimeout(resolve, ms === 0 ? 0 : 10));
                captureSnapshot(ms);
            }

            observer.disconnect();

            return { snapshots, domMutations };
        });

        console.log('\n=== 첫 로딩 DOM 변화 이벤트 ===');
        firstLoadData.domMutations.forEach(mutation => {
            console.log(`${mutation.time}ms: [${mutation.type}] ${mutation.detail}`);
        });

        console.log('\n=== 첫 로딩 Card 3, 4 위치 변화 (y좌표만) ===');
        firstLoadData.snapshots.forEach(snapshot => {
            const card3 = snapshot.cards[3];
            const card4 = snapshot.cards[4];
            if (card3 && card4) {
                console.log(`${snapshot.time}ms: Card3=${card3.y}px, Card4=${card4.y}px`);
            }
        });

        // 2. 스크롤 후 새로고침
        console.log('\n=== 2단계: 모니터링 플랫폼 카드로 스크롤 ===');

        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });
        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        console.log('\n=== 3단계: 새로고침 후 초정밀 시계열 데이터 수집 ===');

        await page.reload({ waitUntil: 'domcontentloaded' });

        const reloadData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                cards: Array<{ index: number; title: string; y: number; height: number }>;
                masonryClass: string;
            }> = [];

            const domMutations: Array<{ time: number; type: string; detail: string }> = [];

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    const elapsed = performance.now();
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        const target = mutation.target as HTMLElement;
                        if (target.classList.contains('project-card')) {
                            const title = target.querySelector('h3')?.textContent || '';
                            domMutations.push({
                                time: Math.round(elapsed),
                                type: 'style',
                                detail: `Card: ${title.substring(0, 20)}`
                            });
                        }
                    } else if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const target = mutation.target as HTMLElement;
                        if (target.id === 'masonry-grid') {
                            domMutations.push({
                                time: Math.round(elapsed),
                                type: 'grid-class',
                                detail: target.className
                            });
                        }
                    }
                });
            });

            const grid = document.getElementById('masonry-grid');
            if (grid) {
                observer.observe(grid, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['style', 'class']
                });
            }

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const grid = document.getElementById('masonry-grid');

                snapshots.push({
                    time: elapsed,
                    masonryClass: grid?.className || '',
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
                            y: Math.round(offsetTop),
                            height: Math.round(el.offsetHeight)
                        };
                    })
                });
            };

            for (let ms = 0; ms <= 3000; ms += 10) {
                await new Promise(resolve => setTimeout(resolve, ms === 0 ? 0 : 10));
                captureSnapshot(ms);
            }

            observer.disconnect();

            return { snapshots, domMutations };
        });

        console.log('\n=== 새로고침 DOM 변화 이벤트 ===');
        reloadData.domMutations.forEach(mutation => {
            console.log(`${mutation.time}ms: [${mutation.type}] ${mutation.detail}`);
        });

        console.log('\n=== 새로고침 Card 3, 4 위치 변화 (y좌표만) ===');
        reloadData.snapshots.forEach(snapshot => {
            const card3 = snapshot.cards[3];
            const card4 = snapshot.cards[4];
            if (card3 && card4) {
                console.log(`${snapshot.time}ms: Card3=${card3.y}px, Card4=${card4.y}px`);
            }
        });

        // 4. 상세 분석
        console.log('\n=== 4단계: 초정밀 비교 분석 ===');

        const analyzePositionChanges = (snapshots: any[], cardIndex: number) => {
            const positions = snapshots.map(s => s.cards[cardIndex]?.y).filter(y => y !== undefined);
            const changes: Array<{ time: number; from: number; to: number; diff: number }> = [];

            for (let i = 1; i < positions.length; i++) {
                if (Math.abs(positions[i] - positions[i - 1]) > 5) {
                    changes.push({
                        time: snapshots[i].time,
                        from: positions[i - 1],
                        to: positions[i],
                        diff: positions[i] - positions[i - 1]
                    });
                }
            }

            return { positions, changes };
        };

        const card3FirstLoad = analyzePositionChanges(firstLoadData.snapshots, 3);
        const card3Reload = analyzePositionChanges(reloadData.snapshots, 3);
        const card4FirstLoad = analyzePositionChanges(firstLoadData.snapshots, 4);
        const card4Reload = analyzePositionChanges(reloadData.snapshots, 4);

        console.log('\nCard 3 위치 변화 상세:');
        console.log('  첫 로딩:');
        card3FirstLoad.changes.forEach(change => {
            console.log(`    ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
        });
        console.log('  새로고침:');
        card3Reload.changes.forEach(change => {
            console.log(`    ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
        });

        console.log('\nCard 4 위치 변화 상세:');
        console.log('  첫 로딩:');
        card4FirstLoad.changes.forEach(change => {
            console.log(`    ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
        });
        console.log('  새로고침:');
        card4Reload.changes.forEach(change => {
            console.log(`    ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
        });

        const card3FirstFinal = card3FirstLoad.positions[card3FirstLoad.positions.length - 1];
        const card3ReloadFinal = card3Reload.positions[card3Reload.positions.length - 1];
        const card4FirstFinal = card4FirstLoad.positions[card4FirstLoad.positions.length - 1];
        const card4ReloadFinal = card4Reload.positions[card4Reload.positions.length - 1];

        console.log('\n최종 위치 비교:');
        console.log(`  Card 3: 첫 로딩=${card3FirstFinal}px, 새로고침=${card3ReloadFinal}px, 차이=${Math.abs(card3FirstFinal - card3ReloadFinal)}px`);
        console.log(`  Card 4: 첫 로딩=${card4FirstFinal}px, 새로고침=${card4ReloadFinal}px, 차이=${Math.abs(card4FirstFinal - card4ReloadFinal)}px`);

        if (card3FirstLoad.changes.length > 0 || card3Reload.changes.length > 0 ||
            card4FirstLoad.changes.length > 0 || card4Reload.changes.length > 0) {
            console.log('\n⚠️  레이아웃 변화 감지됨 - 위 상세 로그 참조');
        }
    });
});
