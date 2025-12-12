import { test, expect } from './fixtures/base-fixture';

test.describe('Cmd+R vs 일반 새로고침 비교', () => {
    test('스크롤 복원 및 레이아웃 점프 측정', async ({ page }) => {
        console.log('\n=== 1단계: 초기 페이지 로드 및 스크롤 ===');

        await page.goto('http://localhost:8080/#projects', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2000);

        // 모니터링 카드로 스크롤
        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });
        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // 스크롤 위치 및 카드 위치 기록
        const beforeReload = await page.evaluate(() => {
            const cards = Array.from(document.querySelectorAll('.project-card'));
            const card3 = cards[3];
            const card4 = cards[4];

            let offsetTop3 = 0;
            let element3 = card3 as HTMLElement;
            while (element3) {
                offsetTop3 += element3.offsetTop;
                element3 = element3.offsetParent as HTMLElement | null;
            }

            let offsetTop4 = 0;
            let element4 = card4 as HTMLElement;
            while (element4) {
                offsetTop4 += element4.offsetTop;
                element4 = element4.offsetParent as HTMLElement | null;
            }

            return {
                scrollY: window.scrollY,
                card3Y: Math.round(offsetTop3),
                card4Y: Math.round(offsetTop4)
            };
        });

        console.log('\n새로고침 전:');
        console.log(`  Scroll Y: ${beforeReload.scrollY}px`);
        console.log(`  Card 3: ${beforeReload.card3Y}px`);
        console.log(`  Card 4: ${beforeReload.card4Y}px`);

        // 2. Cmd+R 시뮬레이션 (keyboard reload)
        console.log('\n=== 2단계: Cmd+R 시뮬레이션 ===');

        await page.keyboard.down('Meta'); // Cmd key
        await page.keyboard.press('KeyR');
        await page.keyboard.up('Meta');

        await page.waitForTimeout(100);

        // 페이지 로드 직후부터 3초간 시계열 측정
        const cmdRData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                scrollY: number;
                card3Y: number;
                card4Y: number;
                gridReady: boolean;
            }> = [];

            const captureSnapshot = (elapsed: number) => {
                const cards = Array.from(document.querySelectorAll('.project-card'));
                const card3 = cards[3];
                const card4 = cards[4];
                const grid = document.getElementById('masonry-grid');

                if (!card3 || !card4) return;

                let offsetTop3 = 0;
                let element3 = card3 as HTMLElement;
                while (element3) {
                    offsetTop3 += element3.offsetTop;
                    element3 = element3.offsetParent as HTMLElement | null;
                }

                let offsetTop4 = 0;
                let element4 = card4 as HTMLElement;
                while (element4) {
                    offsetTop4 += element4.offsetTop;
                    element4 = element4.offsetParent as HTMLElement | null;
                }

                snapshots.push({
                    time: elapsed,
                    scrollY: Math.round(window.scrollY),
                    card3Y: Math.round(offsetTop3),
                    card4Y: Math.round(offsetTop4),
                    gridReady: grid?.classList.contains('masonry-ready') || false
                });
            };

            // 0ms부터 3000ms까지 50ms 간격
            for (let ms = 0; ms <= 3000; ms += 50) {
                await new Promise(resolve => setTimeout(resolve, ms === 0 ? 0 : 50));
                captureSnapshot(ms);
            }

            return snapshots;
        });

        console.log('\n=== Cmd+R 후 시계열 데이터 ===');
        console.log('Time | ScrollY | Card3 | Card4 | Ready');
        cmdRData.forEach(snap => {
            console.log(`${snap.time}ms: scroll=${snap.scrollY}, card3=${snap.card3Y}, card4=${snap.card4Y}, ready=${snap.gridReady}`);
        });

        // 위치 변화 분석
        console.log('\n=== 3단계: 위치 변화 분석 ===');

        const changes: Array<{ time: number; type: string; from: number; to: number }> = [];

        for (let i = 1; i < cmdRData.length; i++) {
            const prev = cmdRData[i - 1];
            const curr = cmdRData[i];

            if (Math.abs(curr.scrollY - prev.scrollY) > 10) {
                changes.push({
                    time: curr.time,
                    type: 'Scroll',
                    from: prev.scrollY,
                    to: curr.scrollY
                });
            }

            if (Math.abs(curr.card3Y - prev.card3Y) > 5) {
                changes.push({
                    time: curr.time,
                    type: 'Card3',
                    from: prev.card3Y,
                    to: curr.card3Y
                });
            }

            if (Math.abs(curr.card4Y - prev.card4Y) > 5) {
                changes.push({
                    time: curr.time,
                    type: 'Card4',
                    from: prev.card4Y,
                    to: curr.card4Y
                });
            }
        }

        console.log('\n변화 감지:');
        changes.forEach(change => {
            console.log(`  ${change.time}ms: ${change.type} ${change.from}px → ${change.to}px (${change.to - change.from > 0 ? '+' : ''}${change.to - change.from}px)`);
        });

        if (changes.length === 0) {
            console.log('  변화 없음 ✅');
        } else {
            console.log(`\n⚠️  총 ${changes.length}개의 위치 변화 감지됨`);
        }
    });
});
