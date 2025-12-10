import { test, expect } from '../fixtures/base-fixture';

test.describe('애니메이션 타이밍 측정', () => {

  test('필터 전환 총 소요 시간 측정', async ({ projectsPage }) => {
    const startTime = Date.now();

    await projectsPage.click('[data-filter="cloud"]');

    await projectsPage.waitForFunction(() => {
      const fadingCards = document.querySelectorAll(
        '.project-card.is-fading-out, .project-card.is-fading-in'
      );
      return fadingCards.length === 0;
    }, { timeout: 2000 });

    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(`Filter transition duration: ${duration}ms`);

    expect(duration).toBeLessThan(2500);
    expect(duration).toBeGreaterThan(300);
  });

  test('프레임 드롭 없이 애니메이션 실행', async ({ projectsPage }) => {
    const frameData = await projectsPage.evaluate(async () => {
      return new Promise<{ frames: number; duration: number }>((resolve) => {
        let frameCount = 0;
        let startTime = 0;

        function countFrame(timestamp: number) {
          if (!startTime) startTime = timestamp;
          frameCount++;

          if (timestamp - startTime < 500) {
            requestAnimationFrame(countFrame);
          } else {
            resolve({
              frames: frameCount,
              duration: timestamp - startTime
            });
          }
        }

        const btn = document.querySelector('[data-filter="backend"]');
        (btn as HTMLElement).click();

        requestAnimationFrame(countFrame);
      });
    });

    const fps = (frameData.frames / frameData.duration) * 1000;
    console.log(`Animation FPS: ${fps.toFixed(1)}`);

    expect(fps).toBeGreaterThan(30);
  });
});
