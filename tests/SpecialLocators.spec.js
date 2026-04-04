const {test, expect}= require ('@playwright/test');

test("Special Locators",async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByPlaceholder("Password").fill("123456hvfhe");
    await page.getByRole("button",{name:"Submit"}).click();
    const message=await page.getByText(" The Form has been submitted successfully!.").textContent();
    await page.getByRole("link",{name:"Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
});