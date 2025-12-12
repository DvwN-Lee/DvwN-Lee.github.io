import { test as base, Page, expect } from '@playwright/test';

export const test = base.extend<{
  projectsPage: Page;
}>({
  projectsPage: async ({ page }, use) => {
    // Featured Projects 섹션으로 직접 이동
    await page.goto('/#projects', { waitUntil: 'domcontentloaded' });

    // JavaScript 실행 시간 확보 (증가)
    await page.waitForTimeout(1000);

    // Masonry layout 준비 대기 (timeout 증가)
    await page.waitForSelector('.projects-grid.masonry-ready', {
      timeout: 30000
    });

    // 이미지 로딩 대기 (timeout 증가, 실패 시 무시)
    await page.waitForFunction(() => {
      const images = document.querySelectorAll('.project-card img');
      return Array.from(images).every(img =>
        (img as HTMLImageElement).complete
      );
    }, { timeout: 20000 }).catch(() => {
      console.log('Image loading timeout - proceeding anyway');
    });

    // 추가 안정화 대기
    await page.waitForTimeout(500);

    // AOS 애니메이션 완료 대기 (첫 번째 카드가 완전히 표시될 때까지)
    await page.waitForFunction(() => {
      const firstCard = document.querySelector('.project-card');
      if (!firstCard) return false;

      const opacity = parseFloat(window.getComputedStyle(firstCard).opacity);
      const hasAosAnimate = firstCard.classList.contains('aos-animate');

      // opacity가 1이고 aos-animate 클래스가 있으면 애니메이션 완료
      return opacity === 1 && hasAosAnimate;
    }, { timeout: 10000 }).catch(() => {
      console.log('AOS animation timeout - proceeding anyway');
    });

    await use(page);
  },
});

export { expect };
