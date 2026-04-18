const {test, expect}= require ('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const{DashboardPage}=require('../pageObjects/DashBoardPage');
const{CartPage}=require('../pageObjects/CartPage');
const{CheckOutPage}=require('../pageObjects/CheckOutPage');


test('E2E testing',async({page})=>{
        const productName='iphone 13 pro';
        const userEmail="rnithishkumar080421@gmail.com";
        const userPassword="Rnithish21##";

        const loginPage = new LoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(userEmail,userPassword);
        const dashboardPage=new DashboardPage(page);
        await dashboardPage.verifyProduct();
        await dashboardPage.addToCart(productName);
        await dashboardPage.goToCartPage();
        const cartPage=new CartPage(page);
        await expect(cartPage.verifyProductInCart(productName)).toBeTruthy();
        cartPage.goToCheckOut();
        const checkOutPage=new CheckOutPage(page);
        await checkOutPage.fillCheckOutPage("Ind","12","20","Test Card",userEmail);
        await checkOutPage.placeOrder();

        /*
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
        */
});

