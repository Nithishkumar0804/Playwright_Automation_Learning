const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,

  expect: {
    timeout: 30000
  },
  workers:3,
  reporter: 'html',

  use: {
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure'
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        video:'retain-on-failure'
      }
    },
     {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      }
    },
     {
      name: 'iphone',
      use: {
        browserName: 'chromium',
        ignoreHTTPSErrors:true,
        ...devices['iPhone 11 Pro Max'],
        permissions:["geolocation"],
        video:'retain-on-failure'
      }
    },
  ]
});