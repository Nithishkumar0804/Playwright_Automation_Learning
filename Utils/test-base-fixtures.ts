import { test as baseTest } from '@playwright/test';

interface TestDataForOrder {
  userName: string;
  userPassword: string;
  productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder;}>({
  testDataForOrder: async ({}, use) => {
    await use({
      userName: "rnithishkumar080422@gmail.com",
      userPassword: "",
      productName: ""
    });
  }
});