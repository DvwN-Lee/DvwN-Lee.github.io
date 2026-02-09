import { test, expect } from '@playwright/test';

/**
 * 카테고리 필터 전환 시 프로젝트 카드 애니메이션 검증 테스트
 *
 * 문제: 첫 번째 카드는 fade-up 애니메이션이 정상 작동하지만,
 *       나머지 카드들은 y값이 고정된 채로 opacity만 변경됨
 */

test.describe('Category Filter Animation Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');

    // Featured Projects 섹션으로 스크롤
    await page.locator('#projects').scrollIntoViewIfNeeded();

    // 초기 로딩 애니메이션 완료 대기
    await page.waitForTimeout(2000);
  });

  test('should animate all cards with fade-up when switching to Backend filter', async ({ page }) => {
    console.log('\n=== Backend Filter Animation Test ===\n');

    // Backend 필터 클릭 전 상태 캡처
    const allCards = page.locator('.project-card');
    const initialCount = await allCards.count();
    console.log(`Initial cards count: ${initialCount}`);

    // Backend 필터 버튼 클릭
    await page.click('button[data-filter="backend"]');

    // 필터 전환 직후 짧은 대기 (애니메이션 시작 전 초기 상태 캡처용)
    await page.waitForTimeout(50);

    // 보이는 카드들의 초기 transform 값 수집
    const visibleCards = page.locator('.project-card:not(.hide)');
    const cardCount = await visibleCards.count();
    console.log(`Visible cards after filter: ${cardCount}`);

    const initialStates = [];
    for (let i = 0; i < cardCount; i++) {
      const card = visibleCards.nth(i);
      const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
      const opacity = await card.evaluate(el => window.getComputedStyle(el).opacity);
      const inlineTransform = await card.evaluate(el => (el as HTMLElement).style.transform);

      initialStates.push({
        index: i,
        computedTransform: transform,
        opacity: opacity,
        inlineTransform: inlineTransform
      });

      console.log(`Card ${i} initial state:`, {
        computed: transform,
        opacity: opacity,
        inline: inlineTransform
      });
    }

    // 애니메이션 진행 중간 상태 캡처 (100ms 후)
    await page.waitForTimeout(100);

    console.log('\n--- Mid-animation state (100ms) ---');
    const midStates = [];
    for (let i = 0; i < cardCount; i++) {
      const card = visibleCards.nth(i);
      const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
      const opacity = await card.evaluate(el => window.getComputedStyle(el).opacity);

      midStates.push({
        index: i,
        transform: transform,
        opacity: opacity
      });

      console.log(`Card ${i} mid state:`, {
        transform: transform,
        opacity: opacity
      });
    }

    // 애니메이션 완료 후 최종 상태 캡처
    await page.waitForTimeout(500);

    console.log('\n--- Final animation state (600ms total) ---');
    const finalStates = [];
    for (let i = 0; i < cardCount; i++) {
      const card = visibleCards.nth(i);
      const transform = await card.evaluate(el => window.getComputedStyle(el).transform);
      const opacity = await card.evaluate(el => window.getComputedStyle(el).opacity);

      finalStates.push({
        index: i,
        transform: transform,
        opacity: opacity
      });

      console.log(`Card ${i} final state:`, {
        transform: transform,
        opacity: opacity
      });
    }

    // 분석: 어떤 카드가 애니메이션 문제를 가지고 있는지 판단
    console.log('\n=== Animation Analysis ===');
    for (let i = 0; i < cardCount; i++) {
      const hadTransformChange = initialStates[i].inlineTransform !== '' &&
                                 initialStates[i].inlineTransform.includes('translateY');
      const opacityChanged = parseFloat(initialStates[i].opacity) < 1 &&
                            parseFloat(finalStates[i].opacity) === 1;

      console.log(`\nCard ${i}:`);
      console.log(`  - Had transform set: ${hadTransformChange}`);
      console.log(`  - Opacity changed: ${opacityChanged} (${initialStates[i].opacity} → ${finalStates[i].opacity})`);
      console.log(`  - Animation appears correct: ${hadTransformChange && opacityChanged}`);
    }

    // 스크린샷 저장
    await page.screenshot({
      path: 'test-results/backend-filter-final.png',
      fullPage: true
    });
  });

  test('should capture detailed animation timeline for all filters', async ({ page }) => {
    const filters = ['backend', 'cloud', 'fullstack', 'all'];

    for (const filter of filters) {
      console.log(`\n\n=== Testing ${filter.toUpperCase()} Filter ===\n`);

      // 필터 클릭
      await page.click(`button[data-filter="${filter}"]`);

      // 타임라인 데이터 수집 (0ms, 50ms, 100ms, 200ms, 400ms)
      const timeline = [0, 50, 100, 200, 400];
      const timelineData = [];

      for (const delay of timeline) {
        await page.waitForTimeout(delay);

        const visibleCards = page.locator('.project-card:not(.hide)');
        const count = await visibleCards.count();
        const snapshot = [];

        for (let i = 0; i < count; i++) {
          const card = visibleCards.nth(i);
          const styles = await card.evaluate(el => {
            const computed = window.getComputedStyle(el);
            const inline = (el as HTMLElement).style;
            return {
              computedTransform: computed.transform,
              computedOpacity: computed.opacity,
              inlineTransform: inline.transform,
              inlineOpacity: inline.opacity,
              hasNoTransition: el.classList.contains('no-transition')
            };
          });

          snapshot.push(styles);
        }

        timelineData.push({
          time: delay,
          cards: snapshot
        });
      }

      console.log(`\nFilter: ${filter}`);
      console.log(JSON.stringify(timelineData, null, 2));

      // 다음 필터 테스트를 위한 대기
      await page.waitForTimeout(500);
    }
  });

  test('should check forced reflow execution', async ({ page }) => {
    console.log('\n=== Forced Reflow Check ===\n');

    // animateProjectCards 함수 실행 감지를 위한 console.log 추가
    await page.evaluate(() => {
      const originalLog = console.log;
      (window as any).animationLogs = [];
      console.log = function(...args) {
        (window as any).animationLogs.push(args);
        originalLog.apply(console, args);
      };
    });

    // Backend 필터 클릭
    await page.click('button[data-filter="backend"]');

    await page.waitForTimeout(100);

    // 수집된 로그 확인
    const logs = await page.evaluate(() => (window as any).animationLogs);
    console.log('Animation logs:', logs);

    // 카드별 offsetHeight 접근 여부 확인
    const visibleCards = page.locator('.project-card:not(.hide)');
    const count = await visibleCards.count();

    console.log(`\nChecking ${count} visible cards for reflow triggers:`);
    for (let i = 0; i < count; i++) {
      const card = visibleCards.nth(i);
      const cardInfo = await card.evaluate((el, index) => {
        return {
          index: index,
          offsetHeight: el.offsetHeight,
          clientHeight: el.clientHeight,
          hasReflowHappened: el.offsetHeight > 0
        };
      }, i);

      console.log(`Card ${i}:`, cardInfo);
    }
  });

  test('should verify CSS Grid layout after filter', async ({ page }) => {
    console.log('\n=== CSS Grid Layout Timing Test ===\n');

    // CSS Grid 컨테이너 존재 확인
    const hasGrid = await page.evaluate(() => {
      return document.querySelector('.projects-grid') !== null;
    });

    console.log('CSS Grid container exists:', hasGrid);

    if (!hasGrid) {
      console.log('ERROR: .projects-grid not found');
      return;
    }

    // 필터 클릭 전 보이는 카드 수 확인
    const beforeCount = await page.evaluate(() => {
      return document.querySelectorAll('.project-card:not(.is-hidden)').length;
    });
    console.log(`Before filter: ${beforeCount} visible cards`);

    // Backend 필터 클릭
    await page.click('button[data-filter="backend"]');
    await page.waitForTimeout(800);

    // 필터 클릭 후 보이는 카드 수 확인
    const afterCount = await page.evaluate(() => {
      return document.querySelectorAll('.project-card:not(.is-hidden)').length;
    });
    console.log(`After filter: ${afterCount} visible cards`);
    console.log(`\nCSS Grid auto-layout applied after filter transition`);
  });
});
