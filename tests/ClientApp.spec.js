const {test, expect}= require ('@playwright/test');

test('E-commerce',async({browser})=>{
        const context=await browser.newContext();
        const page=await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const userEmail=page.locator('[placeholder*="email@"]');
        const userPassword=page.locator('#userPassword');
        const loginButton=page.locator('[type*="submit"]');
        await userEmail.fill("rnithishkumar080421@gmail.com");
        await userPassword.fill("Rnithish21##");
        await loginButton.click();
        const productTilte=page.locator('.card-body h5');
        //await page.waitForLoadState('networkidle');
        await page.locator('.card-body h5').first().waitFor();
        const producList=await productTilte.allTextContents();
        console.log(producList);    
}
);

test.only('E2E testing',async({page})=>{
        const productName='ZARA COAT 3';
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const userEmail=page.locator('[placeholder*="email@"]');
        const userPassword=page.locator('#userPassword');
        const loginButton=page.locator('[type*="submit"]');
        const userName="rnithishkumar080421@gmail.com";
        const userPass="Rnithish21##";
        await userEmail.fill(userName);
        await userPassword.fill(userPass);
        await loginButton.click();
        await page.waitForLoadState('networkidle');
        await page.locator('.card-body b').first().waitFor();
        const producList=page.locator('.card-body');
        const prodCount=await producList.count();
        for(let i=0;i<prodCount;i++){
                if(await producList.nth(i).locator('b').textContent()===productName){
                       await producList.nth(i).locator("button[style*='float']").click();
                       break;
                       
                }
        }
        await page.locator('[routerlink$="/dashboard/cart"]').click();
        await page.locator('div li').last().waitFor();
        const cartRes=await page.locator('h3:has-text("ZARA COAT 3")').isVisible();
        await expect(cartRes).toBeTruthy();
        await page.locator('text=Checkout').click();
        await page.locator("input[class$='text-validated']").nth(1).pressSequentially("Ind");  
        const dropdown=page.locator(".ta-results");
        await dropdown.waitFor();
        const dpCount=await dropdown.locator("button").count();
        for(let i=0;i<dpCount;i++){
                if((await dropdown.locator("button").nth(i).textContent()).trim()==="India"){
                        await dropdown.locator("button").nth(i).click();
                        break;
                }
        }
        const selectdropdown=page.locator("select");
        await selectdropdown.nth(0).waitFor();
        await selectdropdown.nth(0).selectOption("12");
        await selectdropdown.nth(1).waitFor();
        await selectdropdown.nth(1).selectOption("15");
        await page.locator("div[class$='small'] input[class$='txt']").fill("123");
        await page.locator("div[class$='field'] input[class$='txt']").fill("Test Card");
        await expect(page.locator(".user__name label[type='text']")).toHaveText(userName);
        await page.locator("div[class='actions'] a").click();
        await expect(await page.locator("h1[class$='hero-primary']").textContent()).toContain("Thankyou for the order.");
        const ordId=await page.locator("label[class$='ng-star-inserted']").textContent();
        const firstSplit=ordId.split("| ")[1];
        const correctOrdId=firstSplit.split(" |")[0].trim();
        //console.log(correctOrdId);
        await page.locator("button[routerlink$='/myorders']").click();
        const rows=await page.locator("tbody tr");
        await rows.first().waitFor();
        for(let i=0;i<await rows.count();i++){
                const rowID=await rows.nth(i).locator("th").textContent();
                if(ordId.includes(rowID)){
                        await rows.nth(i).locator("button").first().click();
                }
        }
        //await page.locator(".col-text").waitFor();
        const orderIDsummary=(await page.locator(".col-text").textContent()).trim();
        await expect(orderIDsummary.includes(correctOrdId)).toBeTruthy();
        //await page.pause();
});

