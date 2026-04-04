const {test, expect}= require ('@playwright/test');

test('Login credentails',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await console.log(page.title());
    const userName=page.locator('#username');
    const userPassword=page.locator('#password');
    const submitButton=page.locator('[type=submit]');
    const productTitle=page.locator('.card-title a');

    await userName.fill('rahulshettyacadem');
    await userPassword.fill("learning");
    await submitButton.click();
    //console.log(await page.locator('[style*=block]').textContent());
    await expect(await page.locator('[style*=block]')).toContainText('Incorrect username/password');
    await userName.clear();
    await userName.fill('rahulshettyacademy');
    await userPassword.clear();
    await userPassword.fill('Learning@830$3mK2');
    await submitButton.click('');
    console.log(await productTilte.first().textContent());
    //console.log(await productTilte.nth(2).textContent());
    console.log(await productTitle.allTextContents());
    

});

test('static dropdown',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator('#username');
    const userPassword=page.locator('#password');
    const submitButton=page.locator('[type=submit]');
    const docsLink=page.locator('[href*="documents-request"]');
    await userName.fill('rahulshettyacademy');
    await userPassword.fill('Learning@830$3mK2');
    await page.locator('.checkmark').nth(1).click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.checkmark').nth(1)).toBeChecked();
    console.log(page.locator('.checkmark').nth(1).isChecked());
    const dropdown=page.locator('select.form-control');
    await dropdown.selectOption('consult');
    await page.locator("#terms").uncheck();
    await expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await page.locator("#terms").check();
    //await page.pause();

    await expect(docsLink).toHaveAttribute('class','blinkingText');
    await submitButton.click();

});

test('Windows Handling',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docsLink=page.locator('[href*="documents-request"]');
    const [newPage]=await Promise.all([
        context.waitForEvent('page'),
        docsLink.click(),
    ])
    //await expect(await newPage.locator("[class*='im-para']:nth-child(2)").textContent()).toContain('Please email us at mentor@rahulshettyacademy.com');
    const text=await newPage.locator("[class*='im-para']:nth-child(2)").textContent();
    const arrayText=text.split('at ');
    const emailtxt=arrayText[1];
    const requiredEmail=emailtxt.split(' with')[0].trim();
    await expect(requiredEmail).toContain('mentor@rahulshettyacademy.com');
    //console.log(requiredEmail);
    const userName=page.locator('#username');
    await userName.fill(requiredEmail);
    console.log(await userName.inputValue());
    //await page.pause();

});
