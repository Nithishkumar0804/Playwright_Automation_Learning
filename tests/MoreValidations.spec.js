const {test,expect}=require("@playwright/test");
const path = require("node:path");

test.describe.configure({mode:'parallel'});   //parallel,serial,default
test("@web Popup validation",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#confirmbtn").click();
    page.on("dialog",dialog=>dialog.accept());
    await page.locator("#mousehover").hover();
    const framePage=page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href$='lifetime-access']:visible").click();
});

test("ScreenShot",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path:"test-results/screenshots/Partial.jpg"});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:"test-results/screenshots/WholeScreenShot.jpg"});
});

//test.only("Visual testing",async({page})=>{
  //  await page.goto("https://dashboard.fastpix.co/login");
   // expect(await page.screenshot()).toMatchSnapshot("ProdLandingPage");
//});
