import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const env = process.env.ENV; //delightful-desert-09a4bb400 | yellow-coast-04525bd00
const baseUrl = env ? `https://${env}.3.azurestaticapps.net` : 'http://localhost:8080'; // default if app is run locally
const headless = process.env.HEADLESS || 'false';
const fullyParallel = process.env.FULLY_PARALLEL || 'true';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './tests/ui',

  // Run all tests in parallel.
  fullyParallel: fullyParallel === 'true',

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: [['html'], ['list'], ['allure-playwright', { detail: true, suiteTitle: true }], ['json', { outputFile: 'test-results/test-results.json' }]],
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: baseUrl,

    // Collect trace when retrying the failed test.
    trace: 'on',
    headless: headless === 'true',
    viewport: { width: 1920, height: 1080 },
  },
  // Configure projects for major browsers.
  projects: [
    // { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      testDir: './tests/ui',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
  // Run your local dev server before starting the tests.
  //   webServer: {
  //     command: 'npm run start',
  //     url: 'http://localhost:8080',
  //     reuseExistingServer: !process.env.CI,
  //   },
});
