import { test, expect } from './fixtures/base-fixture';

test.describe('타겟 카드 레이아웃 점프 정밀 분석', () => {
    test('Cmd+R 후 cloudnative_v1, exam 카드 y값 시계열 측정', async ({ page }) => {
        console.log('\n=== 1단계: 초기 페이지 로드 및 스크롤 ===');

        await page.goto('http://localhost:8080/#projects', { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(2000);

        // 모니터링 카드로 스크롤
        const monitoringCard = page.locator('.project-card').filter({
            hasText: '실시간 마이크로서비스 모니터링 플랫폼'
        });
        await monitoringCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // 스크롤 전 위치 기록
        const beforeReload = await page.evaluate(() => {
            const monitoringCard = document.querySelector('[data-project-id="cloudnative_v1"]');
            const examCard = document.querySelector('[data-project-id="exam"]');

            const getAbsoluteY = (element: HTMLElement | null) => {
                if (!element) return 0;
                let offsetTop = 0;
                let el: HTMLElement | null = element;
                while (el) {
                    offsetTop += el.offsetTop;
                    el = el.offsetParent as HTMLElement | null;
                }
                return Math.round(offsetTop);
            };

            return {
                scrollY: window.scrollY,
                monitoringY: getAbsoluteY(monitoringCard as HTMLElement),
                examY: getAbsoluteY(examCard as HTMLElement)
            };
        });

        console.log('\n새로고침 전:');
        console.log(`  Scroll Y: ${beforeReload.scrollY}px`);
        console.log(`  Monitoring Card: ${beforeReload.monitoringY}px`);
        console.log(`  Exam Card: ${beforeReload.examY}px`);

        console.log('\n=== 2단계: Cmd+R 시뮬레이션 ===');

        await page.keyboard.down('Meta');
        await page.keyboard.press('KeyR');
        await page.keyboard.up('Meta');

        await page.waitForTimeout(100);

        // Cmd+R 후 0ms부터 3000ms까지 50ms 간격으로 측정
        const timeSeriesData = await page.evaluate(async () => {
            const snapshots: Array<{
                time: number;
                scrollY: number;
                monitoringY: number;
                examY: number;
                gridReady: boolean;
            }> = [];

            const getAbsoluteY = (element: HTMLElement | null) => {
                if (!element) return 0;
                let offsetTop = 0;
                let el: HTMLElement | null = element;
                while (el) {
                    offsetTop += el.offsetTop;
                    el = el.offsetParent as HTMLElement | null;
                }
                return Math.round(offsetTop);
            };

            const captureSnapshot = (elapsed: number) => {
                const monitoringCard = document.querySelector('[data-project-id="cloudnative_v1"]');
                const examCard = document.querySelector('[data-project-id="exam"]');
                const grid = document.querySelector('.projects-grid');

                snapshots.push({
                    time: elapsed,
                    scrollY: Math.round(window.scrollY),
                    monitoringY: getAbsoluteY(monitoringCard as HTMLElement),
                    examY: getAbsoluteY(examCard as HTMLElement),
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

        console.log('\n=== Cmd+R 후 시계열 데이터 (타겟 카드) ===');
        console.log('Time | ScrollY | Monitoring | Exam | Ready');
        timeSeriesData.forEach(snap => {
            console.log(`${snap.time}ms: scroll=${snap.scrollY}, monitoring=${snap.monitoringY}, exam=${snap.examY}, ready=${snap.gridReady}`);
        });

        // 위치 변화 분석
        console.log('\n=== 3단계: 위치 변화 분석 ===');

        const monitoringChanges: Array<{ time: number; from: number; to: number; diff: number }> = [];
        const examChanges: Array<{ time: number; from: number; to: number; diff: number }> = [];

        for (let i = 1; i < timeSeriesData.length; i++) {
            const prev = timeSeriesData[i - 1];
            const curr = timeSeriesData[i];

            if (Math.abs(curr.monitoringY - prev.monitoringY) > 5) {
                monitoringChanges.push({
                    time: curr.time,
                    from: prev.monitoringY,
                    to: curr.monitoringY,
                    diff: curr.monitoringY - prev.monitoringY
                });
            }

            if (Math.abs(curr.examY - prev.examY) > 5) {
                examChanges.push({
                    time: curr.time,
                    from: prev.examY,
                    to: curr.examY,
                    diff: curr.examY - prev.examY
                });
            }
        }

        console.log('\nMonitoring Card 위치 변화:');
        if (monitoringChanges.length === 0) {
            console.log('  변화 없음 ✅');
        } else {
            monitoringChanges.forEach(change => {
                console.log(`  ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
            });
        }

        console.log('\nExam Card 위치 변화:');
        if (examChanges.length === 0) {
            console.log('  변화 없음 ✅');
        } else {
            examChanges.forEach(change => {
                console.log(`  ${change.time}ms: ${change.from}px → ${change.to}px (${change.diff > 0 ? '+' : ''}${change.diff}px)`);
            });
        }

        // 최종 위치와 초기 위치 비교
        const finalMonitoringY = timeSeriesData[timeSeriesData.length - 1].monitoringY;
        const finalExamY = timeSeriesData[timeSeriesData.length - 1].examY;

        console.log('\n=== 4단계: 최종 위치 비교 ===');
        console.log(`Monitoring Card: 초기=${beforeReload.monitoringY}px, 최종=${finalMonitoringY}px, 차이=${finalMonitoringY - beforeReload.monitoringY}px`);
        console.log(`Exam Card: 초기=${beforeReload.examY}px, 최종=${finalExamY}px, 차이=${finalExamY - beforeReload.examY}px`);

        if (monitoringChanges.length > 0 || examChanges.length > 0) {
            console.log('\n⚠️  레이아웃 점프 감지됨!');
            console.log(`   Monitoring Card: ${monitoringChanges.length}회 변화`);
            console.log(`   Exam Card: ${examChanges.length}회 변화`);
        } else {
            console.log('\n✅ 레이아웃 점프 없음');
        }
    });
});
