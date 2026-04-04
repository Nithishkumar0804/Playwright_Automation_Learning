import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:10*1000,
  expect:{
    timeout:4000
  },
  //reporter:'html',
  use:{
    browserName:'chromium',
    headless: true
  }
  

});

module.exports=config;