import { chromium} from '@playwright/test';
import { trace } from 'node:console';

const config=({
  testDir: './tests',
  timeout:30*1000,
  expect:{
    timeout:30000
  }, 
  reporter:[["line"],["html"],["allure-playwright"]],
  retries: 1,
  use:{
    browserName:'chromium',
    headless: true,
    screenshot:"on",
    trace:"retain-on-failure",//on,off,retain-on-failure
    video:'retain-on-failure'
  },
});

module.exports=config;