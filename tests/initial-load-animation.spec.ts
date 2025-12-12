import { test, expect } from './fixtures/base-fixture';

test.describe('첫 페이지 로딩 시 카테고리 전환 애니메이션 분석', () => {
    test('초기 로딩 → Cloud/DevOps 전환 시 애니메이션 정량 측정', async ({ page }) => {
        console.log('\n=== 첫 페이지 로딩 시 애니메이션 측정 ===');

        // 새로운 페이지로 이동 (캐시 없이)
        await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });

        // Masonry 초기화 대기
        await page.waitForSelector('.masonry-ready', { timeout: 5000 });

        console.log('\n=== Masonry 초기화 완료 ===');

        // 모든 카드 위치 확인
        const allCards = await page.locator('.project-card').all();
        console.log(`\n초기 상태 (All): 총 ${allCards.length}개 카드`);

        for (let i = 0; i < allCards.length; i++) {
            const card = allCards[i];
            const title = await card.locator('h3').textContent();
            const box = await card.boundingBox();
            console.log(`  Card ${i}: "${title}" at x=${box?.x.toFixed(2)}, y=${box?.y.toFixed(2)}`);
        }

        // K8s CI/CD 카드 찾기
        const k8sCard = allCards[2]; // index 2
        const k8sTitle = await k8sCard.locator('h3').textContent();
        console.log(`\nK8s CI/CD 카드 인덱스: 2 ("${k8sTitle}")`);

        console.log('\n=== Cloud/DevOps 클릭 시작 ===');

        // 애니메이션 추적 데이터 수집
        const tracking = await page.evaluate(async () => {
            const cards = Array.from(document.querySelectorAll('.project-card'));
            const k8sCard = cards[2];
            const cloudBtn = document.querySelector('[data-filter="cloud"]') as HTMLButtonElement;

            const data: Array<{
                time: number;
                x: number;
                y: number;
                opacity: number;
                classes: string[];
            }> = [];

            // 초기 위치
            const initialBox = k8sCard.getBoundingClientRect();
            const initialOpacity = parseFloat(window.getComputedStyle(k8sCard).opacity);
            data.push({
                time: 0,
                x: initialBox.x,
                y: initialBox.y,
                opacity: initialOpacity,
                classes: Array.from(k8sCard.classList)
            });

            // Cloud/DevOps 클릭
            const startTime = performance.now();
            cloudBtn.click();

            // 여러 시점에서 측정 (0, 5, 10, 20, 50, 100, 200, 300, 400, 500, 600, 700, 800ms)
            const intervals = [5, 10, 20, 50, 100, 200, 300, 400, 500, 600, 700, 800];

            for (const ms of intervals) {
                await new Promise(resolve => setTimeout(resolve, ms));
                const box = k8sCard.getBoundingClientRect();
                const opacity = parseFloat(window.getComputedStyle(k8sCard).opacity);
                const elapsed = performance.now() - startTime;

                data.push({
                    time: Math.round(elapsed),
                    x: box.x,
                    y: box.y,
                    opacity: opacity,
                    classes: Array.from(k8sCard.classList)
                });
            }

            return data;
        });

        console.log('\n=== K8s CI/CD 카드 애니메이션 분석 ===');

        // 각 시점의 상태 출력
        for (const snapshot of tracking) {
            const hasAOSAnimate = snapshot.classes.includes('aos-animate');
            const hasFadingOut = snapshot.classes.includes('is-fading-out');
            const hasNoTransition = snapshot.classes.includes('no-transition');

            let status = '';
            if (hasFadingOut) status = '[FADING-OUT]';
            else if (hasNoTransition) status = '[NO-TRANSITION]';
            else if (hasAOSAnimate) status = '[AOS-ANIMATE]';
            else status = '[VISIBLE]';

            console.log(`  ${snapshot.time}ms: x=${snapshot.x.toFixed(2)}, y=${snapshot.y.toFixed(2)}, opacity=${snapshot.opacity.toFixed(6)} ${status}`);
        }

        // 정량적 분석
        const xChanges = tracking.filter((s, i) => i > 0 && Math.abs(s.x - tracking[i - 1].x) > 1).length;
        const yChanges = tracking.filter((s, i) => i > 0 && Math.abs(s.y - tracking[i - 1].y) > 1).length;
        const opacityDips = tracking.filter(s => s.opacity < 0.5).length;
        const fadingOutCount = tracking.filter(s => s.classes.includes('is-fading-out')).length;
        const noTransitionCount = tracking.filter(s => s.classes.includes('no-transition')).length;

        console.log('\n=== 정량 분석 ===');
        console.log(`  x 좌표 변화 횟수: ${xChanges}`);
        console.log(`  y 좌표 변화 횟수: ${yChanges}`);
        console.log(`  opacity < 0.5 횟수: ${opacityDips}`);
        console.log(`  is-fading-out 적용 횟수: ${fadingOutCount}`);
        console.log(`  no-transition 적용 횟수: ${noTransitionCount}`);

        // 문제 진단
        const hasProperFadeOut = fadingOutCount > 0;
        const hasProperFadeIn = opacityDips > 0;
        const hasSmoothTransition = xChanges <= 1 && yChanges <= 1;

        console.log('\n=== 문제 진단 ===');
        console.log(`  fade-out 적용됨: ${hasProperFadeOut ? '✅' : '❌'}`);
        console.log(`  fade-in 적용됨: ${hasProperFadeIn ? '✅' : '❌'}`);
        console.log(`  부드러운 전환: ${hasSmoothTransition ? '✅' : '❌'}`);

        if (!hasProperFadeOut) {
            console.log('\n⚠️ 문제: fade-out 애니메이션이 적용되지 않음');
        }
        if (!hasProperFadeIn) {
            console.log('⚠️ 문제: fade-in 애니메이션이 적용되지 않음');
        }
        if (!hasSmoothTransition) {
            console.log('⚠️ 문제: 위치가 여러 번 변경됨 (끊김 현상 가능)');
        }

        // 테스트 통과 조건: fade-out과 fade-in이 모두 적용되어야 함
        expect(hasProperFadeOut, 'fade-out should be applied').toBe(true);
        expect(hasProperFadeIn, 'fade-in should be applied').toBe(true);
    });
});
