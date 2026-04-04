const {test,expect}= require("@playwright/test");

test("Calender Validation",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const month='2';
    const date='9';
    const year='2027';
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(month) - 1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    const expectedList=[month,date,year];
    await page.waitForLoadState('networkidle');
    const dateCheck=page.locator(".react-date-picker__inputGroup__input");
    for(let i=0;await i<expectedList.length;i++){
       const value = await dateCheck.nth(i).inputValue();
       await expect(value).toEqual(expectedList[i]);
    }
});