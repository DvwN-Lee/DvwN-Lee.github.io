import { test as base, Page, expect } from '@playwright/test';

export const test = base.extend<{
  projectsPage: Page;
}>({
  projectsPage: async ({ page }, use) => {
    await page.goto('/');

    await page.waitForSelector('.projects-grid.masonry-ready', {
      timeout: 20000
    });

    await page.waitForFunction(() => {
      const images = document.querySelectorAll('.project-card img');
      return Array.from(images).every(img =>
        (img as HTMLImageElement).complete
      );
    }, { timeout: 15000 }).catch(() => {
      console.log('Image loading timeout - proceeding anyway');
    });

    await use(page);
  },
});

export { expect };
