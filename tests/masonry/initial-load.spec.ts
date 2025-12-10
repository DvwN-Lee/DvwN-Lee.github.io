import { test, expect } from '../fixtures/base-fixture';

test.describe('Masonry 초기 로딩', () => {

  test('깜빡임 없이 카드가 즉시 표시되어야 함', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        if (!text.includes('SameSite') && !text.includes('Cookie')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');

    const initialOpacity = await page.evaluate(() => {
      const card = document.querySelector('.project-card');
      if (!card) return null;
      return window.getComputedStyle(card).opacity;
    });

    expect(initialOpacity).toBe('1');

    await page.waitForSelector('.projects-grid.masonry-ready');

    expect(errors).toHaveLength(0);
  });

  test('모든 프로젝트 카드가 렌더링되어야 함', async ({ projectsPage }) => {
    const cards = await projectsPage.locator('.project-card').count();

    expect(cards).toBe(6);
  });

  test('Masonry 레이아웃이 올바르게 적용되어야 함', async ({ projectsPage }) => {
    const cards = await projectsPage.locator('.project-card').all();
    const boundingBoxes = await Promise.all(
      cards.map(card => card.boundingBox())
    );

    for (const box of boundingBoxes) {
      expect(box).not.toBeNull();
      expect(box!.width).toBeGreaterThan(0);
      expect(box!.height).toBeGreaterThan(0);
    }

    for (let i = 0; i < boundingBoxes.length; i++) {
      for (let j = i + 1; j < boundingBoxes.length; j++) {
        const boxA = boundingBoxes[i]!;
        const boxB = boundingBoxes[j]!;

        const overlapping = !(
          boxA.x + boxA.width <= boxB.x ||
          boxB.x + boxB.width <= boxA.x ||
          boxA.y + boxA.height <= boxB.y ||
          boxB.y + boxB.height <= boxA.y
        );

        if (overlapping) {
          const overlapArea = Math.max(0,
            Math.min(boxA.x + boxA.width, boxB.x + boxB.width) -
            Math.max(boxA.x, boxB.x)
          ) * Math.max(0,
            Math.min(boxA.y + boxA.height, boxB.y + boxB.height) -
            Math.max(boxA.y, boxB.y)
          );

          const smallerArea = Math.min(
            boxA.width * boxA.height,
            boxB.width * boxB.height
          );
          expect(overlapArea / smallerArea).toBeLessThan(0.05);
        }
      }
    }
  });
});
