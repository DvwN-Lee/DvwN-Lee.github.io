import { test, expect } from '../fixtures/base-fixture';

test.describe('시각적 회귀 테스트', () => {

  test.describe.configure({ mode: 'serial' });

  test('Projects 섹션 전체 스크린샷', async ({ projectsPage }) => {
    await projectsPage.locator('#projects').scrollIntoViewIfNeeded();
    await projectsPage.waitForTimeout(500);

    await expect(projectsPage.locator('#projects')).toHaveScreenshot(
      'projects-section-all.png',
      {
        maxDiffPixels: 100,
        animations: 'disabled',
      }
    );
  });

  test('Cloud/DevOps 필터 적용 후 스크린샷', async ({ projectsPage }) => {
    await projectsPage.locator('#projects').scrollIntoViewIfNeeded();
    await projectsPage.click('[data-filter="cloud"]');
    await projectsPage.waitForTimeout(600);

    await expect(projectsPage.locator('#projects')).toHaveScreenshot(
      'projects-section-cloud.png',
      {
        maxDiffPixels: 100,
        animations: 'disabled',
      }
    );
  });

  test('Backend 필터 적용 후 스크린샷', async ({ projectsPage }) => {
    await projectsPage.locator('#projects').scrollIntoViewIfNeeded();
    await projectsPage.click('[data-filter="backend"]');
    await projectsPage.waitForTimeout(600);

    await expect(projectsPage.locator('#projects')).toHaveScreenshot(
      'projects-section-backend.png',
      {
        maxDiffPixels: 100,
        animations: 'disabled',
      }
    );
  });

  test('모바일 뷰포트 스크린샷', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForSelector('.projects-grid.masonry-ready');
    await page.locator('#projects').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    await expect(page.locator('#projects')).toHaveScreenshot(
      'projects-section-mobile.png',
      {
        maxDiffPixels: 150,
        animations: 'disabled',
      }
    );
  });

  test('다크/라이트 테마 스크린샷 비교', async ({ projectsPage }) => {
    await projectsPage.locator('#projects').scrollIntoViewIfNeeded();
    await expect(projectsPage.locator('#projects')).toHaveScreenshot(
      'projects-light-theme.png',
      { animations: 'disabled' }
    );

    await projectsPage.click('#themeToggle');
    await projectsPage.waitForTimeout(300);

    await expect(projectsPage.locator('#projects')).toHaveScreenshot(
      'projects-dark-theme.png',
      { animations: 'disabled' }
    );
  });
});
