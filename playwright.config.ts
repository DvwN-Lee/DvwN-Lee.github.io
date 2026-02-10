import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60000,
  // CI 환경에서 diagnostic 테스트 제외 (assertion 없는 console.log 기반 진단 도구)
  testIgnore: process.env.CI ? [
    '**/diagnose-*.spec.ts',
    '**/detailed-timeseries.spec.ts',
    '**/ultra-detailed-timeseries.spec.ts',
    '**/reload-at-position.spec.ts',
    '**/target-cards-layout-jump.spec.ts',
    '**/cmd-r-vs-reload.spec.ts',
    '**/category-filter-animation.spec.ts',
    '**/layout-conflict.spec.ts',
    '**/scroll-layout-corruption.spec.ts',
  ] : [],
  reporter: [
    ['html'],
    ['list'],
    process.env.CI ? ['github'] : ['line']
  ],

  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  webServer: {
    command: 'npx serve -l 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // {
    //   name: 'mobile-chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
  ],
});
