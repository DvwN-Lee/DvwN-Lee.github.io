import { test, expect } from './fixtures/base-fixture';

test.describe('Masonry Layout Shift Diagnosis', () => {
    test('Cmd+R 시 픽셀 단위 레이아웃 변화 추적', async ({ page }) => {
        // 1. 관찰자 스크립트를 페이지 로드 전에 주입 (가장 중요)
        await page.addInitScript(() => {
            (window as any).__layoutLogs = [];
            const startTime = performance.now();

            // MutationObserver로 스타일 변화 감지
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((m) => {
                    if (m.type === 'attributes' && m.attributeName === 'style') {
                        const target = m.target as HTMLElement;
                        if (target.classList.contains('project-card')) {
                            (window as any).__layoutLogs.push({
                                time: performance.now() - startTime,
                                type: 'move',
                                id: target.getAttribute('data-project-id'),
                                transform: target.style.transform,
                                opacity: target.style.opacity,
                                top: target.getBoundingClientRect().top
                            });
                        }
                    }
                });
            });

            // DOM이 준비되자마자 감시 시작
            document.addEventListener('DOMContentLoaded', () => {
                const grid = document.querySelector('.projects-grid');
                if (grid) {
                    observer.observe(grid, {
                        subtree: true,
                        attributes: true,
                        attributeFilter: ['style', 'class']
                    });
                }
            });
        });

        // 2. 페이지 이동 및 스크롤 시뮬레이션
        await page.goto('http://localhost:8080/#projects');

        // 타겟 요소로 스크롤 (브라우저가 위치를 기억하게 함)
        await page.locator('.project-card[data-project-id="cloudnative_v1"]').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);

        // 3. 새로고침 (Reload)
        console.log('\n=== Reloading Page ===');
        await page.reload();

        // 4. 안정화 대기
        await page.waitForTimeout(3000);

        // 5. 로그 분석
        const logs = await page.evaluate(() => (window as any).__layoutLogs);

        // 특정 카드의 이동 경로 필터링
        const targetLogs = logs.filter((l: any) => l.id === 'cloudnative_v1' || l.id === 'exam');

        console.log(`\n총 ${targetLogs.length}회의 스타일 변경 감지됨`);

        // 카드별로 정리
        const cloudnativeLogs = logs.filter((l: any) => l.id === 'cloudnative_v1');
        const examLogs = logs.filter((l: any) => l.id === 'exam');

        console.log('\n=== cloudnative_v1 카드 변화 ===');
        let prevTransform = '';
        cloudnativeLogs.forEach((log: any) => {
            if (log.transform !== prevTransform) {
                console.log(`[${log.time.toFixed(1)}ms] transform: ${prevTransform || '(none)'} -> ${log.transform}, top: ${log.top.toFixed(1)}px`);
                prevTransform = log.transform;
            }
        });

        console.log('\n=== exam 카드 변화 ===');
        prevTransform = '';
        examLogs.forEach((log: any) => {
            if (log.transform !== prevTransform) {
                console.log(`[${log.time.toFixed(1)}ms] transform: ${prevTransform || '(none)'} -> ${log.transform}, top: ${log.top.toFixed(1)}px`);
                prevTransform = log.transform;
            }
        });

        // 6. 점프 감지: 500ms 이내에 transform이 2번 이상 변하는지 확인
        const earlyChanges = targetLogs.filter((l: any) => l.time < 500);
        const transformChanges = new Set(earlyChanges.map((l: any) => l.transform)).size;

        console.log(`\n초기 500ms 이내 transform 변화 횟수: ${transformChanges}회`);

        if (transformChanges > 1) {
            console.log('⚠️  레이아웃 점프 감지됨!');
        } else {
            console.log('✅ 레이아웃 안정적');
        }
    });
});
