import { test, expect } from './fixtures/base-fixture';

test.describe('AOS Animation During Reload', () => {
    test('AOS fade-up 애니메이션이 reload 시 시각적 spreading을 유발하는지 확인', async ({ page }) => {
        // 1. Before reload: Inject observer to catch AOS state changes
        await page.addInitScript(() => {
            (window as any).__aosLogs = [];
            const startTime = performance.now();

            // MutationObserver로 클래스 변화 감지 (AOS가 aos-animate 추가하는 시점 포착)
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((m) => {
                    if (m.type === 'attributes' && m.attributeName === 'class') {
                        const target = m.target as HTMLElement;
                        if (target.classList.contains('project-card')) {
                            const id = target.getAttribute('data-project-id');
                            const classes = Array.from(target.classList);
                            const style = window.getComputedStyle(target);

                            (window as any).__aosLogs.push({
                                time: performance.now() - startTime,
                                id,
                                hasAosAnimate: classes.includes('aos-animate'),
                                classes: classes.filter(c => c.includes('aos')),
                                opacity: style.opacity,
                                transform: style.transform
                            });
                        }
                    }
                });
            });

            document.addEventListener('DOMContentLoaded', () => {
                const grid = document.querySelector('.projects-grid');
                if (grid) {
                    observer.observe(grid, {
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['class']
                    });
                }
            });
        });

        // 2. 페이지 이동 및 타겟 카드로 스크롤
        await page.goto('http://localhost:8080/#projects');
        await page.locator('.project-card[data-project-id="cloudnative_v1"]').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // 3. Reload
        console.log('\n=== Reloading Page ===');
        await page.reload();

        // 4. 초기 500ms 동안 매 50ms마다 추가 스냅샷
        const manualSnapshots = [];
        for (let ms = 0; ms <= 500; ms += 50) {
            await page.waitForTimeout(ms === 0 ? 0 : 50);

            const snapshot = await page.evaluate(() => {
                const monitoring = document.querySelector('[data-project-id="cloudnative_v1"]');
                const exam = document.querySelector('[data-project-id="exam"]');

                if (!monitoring || !exam) return null;

                const monitoringStyle = window.getComputedStyle(monitoring);
                const examStyle = window.getComputedStyle(exam);

                return {
                    monitoring: {
                        hasAosAnimate: monitoring.classList.contains('aos-animate'),
                        opacity: monitoringStyle.opacity,
                        transform: monitoringStyle.transform,
                        top: monitoring.getBoundingClientRect().top
                    },
                    exam: {
                        hasAosAnimate: exam.classList.contains('aos-animate'),
                        opacity: examStyle.opacity,
                        transform: examStyle.transform,
                        top: exam.getBoundingClientRect().top
                    }
                };
            });

            if (snapshot) {
                manualSnapshots.push({ time: ms, ...snapshot });
            }
        }

        // 5. 안정화 대기
        await page.waitForTimeout(2000);

        // 6. 로그 분석
        const aosLogs = await page.evaluate(() => (window as any).__aosLogs);

        console.log(`\n총 ${aosLogs.length}회의 클래스 변경 감지됨`);

        // cloudnative_v1 카드의 AOS 상태 변화
        const cloudnativeLogs = aosLogs.filter((l: any) => l.id === 'cloudnative_v1');
        console.log('\n=== cloudnative_v1 AOS 상태 변화 ===');
        cloudnativeLogs.forEach((log: any) => {
            console.log(`[${log.time.toFixed(1)}ms] aos-animate: ${log.hasAosAnimate}, opacity: ${log.opacity}, transform: ${log.transform}`);
        });

        // exam 카드의 AOS 상태 변화
        const examLogs = aosLogs.filter((l: any) => l.id === 'exam');
        console.log('\n=== exam AOS 상태 변화 ===');
        examLogs.forEach((log: any) => {
            console.log(`[${log.time.toFixed(1)}ms] aos-animate: ${log.hasAosAnimate}, opacity: ${log.opacity}, transform: ${log.transform}`);
        });

        // 수동 스냅샷 분석
        console.log('\n=== 수동 스냅샷 (50ms 간격) ===');
        manualSnapshots.forEach((snapshot: any) => {
            console.log(`[${snapshot.time}ms]`);
            console.log(`  Monitoring: aos-animate=${snapshot.monitoring.hasAosAnimate}, opacity=${snapshot.monitoring.opacity}, transform=${snapshot.monitoring.transform.substring(0, 50)}`);
            console.log(`  Exam: aos-animate=${snapshot.exam.hasAosAnimate}, opacity=${snapshot.exam.opacity}, transform=${snapshot.exam.transform.substring(0, 50)}`);
        });

        // 7. opacity 변화 감지
        const opacityChanges = manualSnapshots.filter((s: any) =>
            parseFloat(s.monitoring.opacity) < 1 || parseFloat(s.exam.opacity) < 1
        );

        if (opacityChanges.length > 0) {
            console.log(`\n⚠️  투명도 변화 감지: ${opacityChanges.length}개 스냅샷에서 opacity < 1`);
            opacityChanges.forEach((s: any) => {
                console.log(`  [${s.time}ms] Monitoring opacity: ${s.monitoring.opacity}, Exam opacity: ${s.exam.opacity}`);
            });
        } else {
            console.log('\n✅ 투명도 안정적 (모든 스냅샷에서 opacity = 1)');
        }

        // 8. Transform 변화 감지
        const transformChanges = new Set(manualSnapshots.map((s: any) => s.monitoring.transform)).size;
        console.log(`\n초기 500ms 이내 transform 변화 횟수: ${transformChanges}회`);

        if (transformChanges > 1 || opacityChanges.length > 0) {
            console.log('⚠️  AOS 애니메이션이 reload 시 시각적 변화를 유발하고 있습니다!');
        } else {
            console.log('✅ AOS 애니메이션이 reload 시 안정적입니다');
        }
    });
});
