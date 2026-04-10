import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:30*1000,
  expect:{
    timeout:30000
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    headless: true,
    screenshot:"on",
    trace:"retain-on-failure",//on,off,retain-on-failure
  },
});

module.exports=config;