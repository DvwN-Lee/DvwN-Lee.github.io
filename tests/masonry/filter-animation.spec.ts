import { test, expect } from '../fixtures/base-fixture';

test.describe('필터 전환 애니메이션', () => {

  const filters = [
    { name: 'Cloud/DevOps', value: 'cloud', expectedCount: 3 },
    { name: 'Backend', value: 'backend', expectedCount: 2 },
    { name: 'Full Stack', value: 'fullstack', expectedCount: 1 },
    { name: 'All', value: 'all', expectedCount: 6 },
  ];

  for (const filter of filters) {
    test(`${filter.name} 필터 전환이 부드럽게 동작해야 함`, async ({ projectsPage }) => {
      await projectsPage.click(`[data-filter="${filter.value}"]`);

      await expect(
        projectsPage.locator(`[data-filter="${filter.value}"]`)
      ).toHaveClass(/active/);

      await projectsPage.waitForTimeout(500);

      const visibleCards = await projectsPage
        .locator('.project-card:not(.is-hidden)')
        .count();

      expect(visibleCards).toBe(filter.expectedCount);
    });
  }

  test('빠른 연속 필터 클릭 시 애니메이션이 정상 처리되어야 함', async ({ projectsPage }) => {
    await projectsPage.click('[data-filter="cloud"]');
    await projectsPage.waitForTimeout(100);
    await projectsPage.click('[data-filter="backend"]');
    await projectsPage.waitForTimeout(100);
    await projectsPage.click('[data-filter="all"]');

    await projectsPage.waitForTimeout(600);

    const visibleCards = await projectsPage
      .locator('.project-card:not(.is-hidden)')
      .count();

    expect(visibleCards).toBe(6);

    const fadingCards = await projectsPage
      .locator('.project-card.is-fading-out, .project-card.is-fading-in')
      .count();

    expect(fadingCards).toBe(0);
  });

  test('필터 전환 중 레이아웃 점프가 발생하지 않아야 함', async ({ projectsPage }) => {
    const gridInitialBounds = await projectsPage
      .locator('.projects-grid')
      .boundingBox();

    await projectsPage.click('[data-filter="cloud"]');

    const positions: number[] = [];
    for (let i = 0; i < 10; i++) {
      await projectsPage.waitForTimeout(50);
      const bounds = await projectsPage
        .locator('.projects-grid')
        .boundingBox();
      if (bounds) positions.push(bounds.y);
    }

    const maxJump = Math.max(...positions) - Math.min(...positions);
    expect(maxJump).toBeLessThan(200);
  });
});
