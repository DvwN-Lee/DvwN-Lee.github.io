import { test, expect } from '../fixtures/base-fixture';

test.describe('레이아웃 안정성', () => {

  test('CLS(Cumulative Layout Shift) 측정', async ({ page }) => {
    await page.goto('/');

    const cls = await page.evaluate(async () => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;

        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });

        observer.observe({ type: 'layout-shift', buffered: true });

        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 2000);
      });
    });

    console.log(`Measured CLS: ${cls}`);
    expect(cls).toBeLessThan(0.1);
  });

  test('반응형 레이아웃 변경 시 안정성', async ({ projectsPage }) => {
    const viewports = [
      { width: 1200, height: 800 },
      { width: 992, height: 800 },
      { width: 576, height: 800 },
    ];

    for (const viewport of viewports) {
      await projectsPage.setViewportSize(viewport);
      await projectsPage.waitForTimeout(500);

      const cards = await projectsPage
        .locator('.project-card:not(.is-hidden)')
        .count();

      expect(cards).toBe(6);

      const cardElements = await projectsPage.locator('.project-card').all();
      for (const card of cardElements) {
        const box = await card.boundingBox();
        if (box) {
          expect(box.x).toBeGreaterThanOrEqual(-200);
          expect(box.x + box.width).toBeLessThanOrEqual(viewport.width + 200);
        }
      }
    }
  });
});
