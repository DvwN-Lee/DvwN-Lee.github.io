import { test, expect } from './fixtures/base-fixture';

test.describe('스크롤 후 레이아웃 변화 분석', () => {
    test('스크롤 전후 카드 간격 측정', async ({ page }) => {
        console.log('\n=== 1단계: 초기 페이지 로드 ===');

        await page.goto('http://localhost:8080/#projects', { waitUntil: 'load' });
        await page.waitForTimeout(1000);

        // 초기 로드 직후 카드 위치 측정
        const initialPositions = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));

            return cards.map((card, idx) => {
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
            });
        });

        console.log('\n초기 로드 직후 카드 위치:');
        initialPositions.forEach(card => {
            console.log(`  [${card.index}] ${card.title}: y=${card.y}px, height=${card.height}px`);
        });

        // 간격 계산
        console.log('\n초기 카드 간격:');
        for (let i = 1; i < initialPositions.length; i++) {
            const gap = initialPositions[i].y - (initialPositions[i-1].y + initialPositions[i-1].height);
            console.log(`  Card ${i-1} → ${i}: ${gap}px`);
        }

        console.log('\n=== 2단계: 모니터링 플랫폼 카드로 스크롤 ===');

        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });
        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);

        // 스크롤 후 카드 위치 재측정
        const afterScrollPositions = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));

            return cards.map((card, idx) => {
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
            });
        });

        console.log('\n스크롤 후 카드 위치:');
        afterScrollPositions.forEach(card => {
            console.log(`  [${card.index}] ${card.title}: y=${card.y}px, height=${card.height}px`);
        });

        console.log('\n스크롤 후 카드 간격:');
        for (let i = 1; i < afterScrollPositions.length; i++) {
            const gap = afterScrollPositions[i].y - (afterScrollPositions[i-1].y + afterScrollPositions[i-1].height);
            console.log(`  Card ${i-1} → ${i}: ${gap}px`);
        }

        console.log('\n=== 3단계: 위치 변화 분석 ===');

        let layoutChanged = false;
        for (let i = 0; i < initialPositions.length; i++) {
            const diff = afterScrollPositions[i].y - initialPositions[i].y;
            if (Math.abs(diff) > 5) {
                console.log(`  Card ${i} 위치 변화: ${initialPositions[i].y}px → ${afterScrollPositions[i].y}px (${diff > 0 ? '+' : ''}${diff}px)`);
                layoutChanged = true;
            }
        }

        if (!layoutChanged) {
            console.log('  ✅ 스크롤 후에도 레이아웃 유지됨');
        } else {
            console.log('\n⚠️  스크롤로 인한 레이아웃 변화 감지됨!');
        }

        console.log('\n=== 4단계: Cmd+R 후 카드 위치 ===');

        await page.keyboard.down('Meta');
        await page.keyboard.press('KeyR');
        await page.keyboard.up('Meta');

        await page.waitForTimeout(100);
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);

        const afterReloadPositions = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));

            return cards.map((card, idx) => {
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
            });
        });

        console.log('\nCmd+R 후 카드 위치:');
        afterReloadPositions.forEach(card => {
            console.log(`  [${card.index}] ${card.title}: y=${card.y}px, height=${card.height}px`);
        });

        console.log('\nCmd+R 후 카드 간격:');
        for (let i = 1; i < afterReloadPositions.length; i++) {
            const gap = afterReloadPositions[i].y - (afterReloadPositions[i-1].y + afterReloadPositions[i-1].height);
            console.log(`  Card ${i-1} → ${i}: ${gap}px`);
        }

        console.log('\n=== 5단계: 스크롤 후 vs Cmd+R 후 비교 ===');

        let different = false;
        for (let i = 0; i < afterScrollPositions.length; i++) {
            const diff = afterReloadPositions[i].y - afterScrollPositions[i].y;
            if (Math.abs(diff) > 5) {
                console.log(`  Card ${i}: 스크롤 후=${afterScrollPositions[i].y}px, Cmd+R 후=${afterReloadPositions[i].y}px (차이: ${diff > 0 ? '+' : ''}${diff}px)`);
                different = true;
            }
        }

        if (different) {
            console.log('\n🔴 문제 확인: 스크롤 후와 Cmd+R 후 레이아웃이 다름!');
            console.log('   → 스크롤 시 Masonry 레이아웃이 손상되고 있음');
        } else {
            console.log('\n✅ 스크롤 후와 Cmd+R 후 레이아웃이 동일함');
        }
    });
});
