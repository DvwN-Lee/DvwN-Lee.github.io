import { test, expect } from './fixtures/base-fixture';

test.describe('카드 Teleport 문제 진단', () => {
    test('All → Cloud/DevOps 전환 시 K8s CI/CD 카드 애니메이션 추적', async ({ projectsPage }) => {
        console.log('\n=== All → Cloud/DevOps 전환 테스트 ===');

        // All 상태에서 모든 카드의 초기 위치 확인
        const allCards = await projectsPage.locator('.project-card').all();
        console.log(`\n초기 상태 (All): 총 ${allCards.length}개 카드`);

        const initialPositions = [];
        for (let i = 0; i < allCards.length; i++) {
            const rect = await allCards[i].boundingBox();
            const title = await allCards[i].locator('h3').textContent();
            initialPositions.push({
                index: i,
                title: title?.trim(),
                x: rect?.x,
                y: rect?.y
            });
            console.log(`  Card ${i}: "${title?.trim()}" at x=${rect?.x.toFixed(2)}, y=${rect?.y.toFixed(2)}`);
        }

        // K8s CI/CD 카드 찾기 (index 2로 예상)
        const k8sCardIndex = initialPositions.findIndex(p =>
            p.title?.includes('Kubernetes CI/CD Infrastructure') ||
            p.title?.includes('K8s')
        );
        console.log(`\nK8s CI/CD 카드 인덱스: ${k8sCardIndex}`);

        // Cloud/DevOps 버튼 클릭 및 애니메이션 추적
        console.log('\n=== Cloud/DevOps 클릭 시작 ===');

        const animationLog = await projectsPage.evaluate((targetIndex) => {
            return new Promise<Array<{
                time: number;
                card: number;
                x: number;
                y: number;
                opacity: string;
                transform: string;
                classes: string;
            }>>((resolve) => {
                const log: Array<{
                    time: number;
                    card: number;
                    x: number;
                    y: number;
                    opacity: string;
                    transform: string;
                    classes: string;
                }> = [];
                const startTime = Date.now();
                const cards = Array.from(document.querySelectorAll('.project-card'));

                // 초기 상태 기록
                cards.forEach((card, i) => {
                    const el = card as HTMLElement;
                    const rect = el.getBoundingClientRect();
                    const computed = window.getComputedStyle(el);
                    log.push({
                        time: 0,
                        card: i,
                        x: Math.round(rect.x * 10) / 10,
                        y: Math.round(rect.y * 10) / 10,
                        opacity: computed.opacity,
                        transform: computed.transform,
                        classes: el.className
                    });
                });

                // 5ms마다 상태 기록 (800ms 동안)
                let elapsed = 0;
                const interval = setInterval(() => {
                    elapsed = Date.now() - startTime;
                    cards.forEach((card, i) => {
                        const el = card as HTMLElement;
                        const rect = el.getBoundingClientRect();
                        const computed = window.getComputedStyle(el);
                        log.push({
                            time: elapsed,
                            card: i,
                            x: Math.round(rect.x * 10) / 10,
                            y: Math.round(rect.y * 10) / 10,
                            opacity: computed.opacity,
                            transform: computed.transform,
                            classes: el.className
                        });
                    });

                    if (elapsed >= 800) {
                        clearInterval(interval);
                        resolve(log);
                    }
                }, 5);

                // Cloud/DevOps 버튼 클릭
                const devopsBtn = document.querySelector('[data-filter="cloud"]') as HTMLElement;
                devopsBtn?.click();
            });
        }, k8sCardIndex);

        // K8s CI/CD 카드의 애니메이션 분석
        console.log(`\n=== K8s CI/CD 카드 (Card ${k8sCardIndex}) 애니메이션 분석 ===`);
        const k8sLogs = animationLog.filter(log => log.card === k8sCardIndex);

        // 주요 시점 출력
        const snapshots = [0, 5, 10, 20, 50, 100, 200, 300, 400, 500, 600, 700, 800];
        snapshots.forEach(time => {
            const logEntry = k8sLogs.find(log => Math.abs(log.time - time) < 3);
            if (logEntry) {
                const hasFadingOut = logEntry.classes.includes('is-fading-out');
                const hasFadingIn = logEntry.classes.includes('is-fading-in');
                const hasHidden = logEntry.classes.includes('hidden');
                const status = hasFadingOut ? ' [FADING-OUT]' :
                              hasFadingIn ? ' [FADING-IN]' :
                              hasHidden ? ' [HIDDEN]' : ' [VISIBLE]';
                console.log(
                    `  ${time}ms: x=${logEntry.x.toFixed(2)}, y=${logEntry.y.toFixed(2)}, ` +
                    `opacity=${logEntry.opacity}${status}`
                );
            }
        });

        // x, y 좌표 변화 분석
        const xValues = [...new Set(k8sLogs.map(log => Math.round(log.x)))];
        const yValues = [...new Set(k8sLogs.map(log => Math.round(log.y)))];
        console.log(`\n  x 좌표 변화 수: ${xValues.size}`);
        console.log(`  y 좌표 변화 수: ${yValues.size}`);

        if (xValues.size > 1) {
            console.log(`  x 좌표 값들: ${xValues.join(', ')}`);
        }
        if (yValues.size > 1) {
            console.log(`  y 좌표 값들: ${yValues.slice(0, 5).join(', ')}...`);
        }

        // fade-out/fade-in 클래스 추적
        const hasFadeOut = k8sLogs.some(log => log.classes.includes('is-fading-out'));
        const hasFadeIn = k8sLogs.some(log => log.classes.includes('is-fading-in'));
        console.log(`\n  fade-out 클래스 발견: ${hasFadeOut}`);
        console.log(`  fade-in 클래스 발견: ${hasFadeIn}`);

        // Teleport 감지: x 좌표가 갑자기 변하는지 확인
        let teleportDetected = false;
        for (let i = 1; i < k8sLogs.length; i++) {
            const prev = k8sLogs[i - 1];
            const curr = k8sLogs[i];
            const xDiff = Math.abs(curr.x - prev.x);

            // opacity가 1이고 x 좌표가 100px 이상 변하면 teleport
            if (curr.opacity === '1' && prev.opacity === '1' && xDiff > 100) {
                console.log(`\n  ⚠️  TELEPORT 감지!`);
                console.log(`      ${prev.time}ms: x=${prev.x.toFixed(2)}, opacity=${prev.opacity}`);
                console.log(`      ${curr.time}ms: x=${curr.x.toFixed(2)}, opacity=${curr.opacity} (${xDiff.toFixed(2)}px 이동)`);
                teleportDetected = true;
                break;
            }
        }

        if (!teleportDetected) {
            console.log(`\n  ✅ Teleport 현상 없음`);
        }
    });
});
