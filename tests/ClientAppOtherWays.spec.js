const {test, expect}= require ('@playwright/test');

test('E2E testing',async({page})=>{
        const productName='ZARA COAT 3';
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        const userEmail=page.getByPlaceholder("email@example.com");
        const userPassword=page.getByPlaceholder("enter your passsword");
        const loginButton=page.getByRole("button",{name:"Login"});
        const userName="rnithishkumar080421@gmail.com";
        const userPass="Rnithish21##";
        await userEmail.fill(userName);
        await userPassword.fill(userPass);
        await loginButton.click();
        await page.waitForLoadState('networkidle');
        await page.locator('.card-body b').first().waitFor();
        await page.locator(".card-body").filter({hasText:productName}).getByRole("button",{name:"Add To Cart"}).click();
        await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
        await page.locator('div li').last().waitFor();
        await expect(page.getByText(productName).isVisible()).toBeTruthy();
        await page.getByRole("button",{name:"Checkout"}).click();
        await page.getByPlaceholder("Select Country").pressSequentially("Ind");
        await page.getByRole("button",{name:"India"}).nth(1).click();
        await page.getByText("PLACE ORDER").click();
        await expect(page.getByText("Thankyou for the order.").isVisible()).toBeTruthy();            
        const ordId=await page.locator("label[class$='ng-star-inserted']").textContent();
        const firstSplit=ordId.split("| ")[1];
        const correctOrdId=firstSplit.split(" |")[0].trim();
        await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click();
        await page.waitForLoadState('networkidle');
        await expect(page.getByText(correctOrdId).isVisible()).toBeTruthy();
        await page.locator("tbody tr").filter({hasText:correctOrdId}).getByRole("button",{name:"View"}).click();
        await expect(page.getByText(correctOrdId).isVisible()).toBeTruthy();
});

