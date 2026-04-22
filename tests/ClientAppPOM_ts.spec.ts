import {test, expect,Page} from '@playwright/test';
import { POManager } from '../pageObjects_ts/POManager';
const testData=JSON.parse(JSON.stringify(require('../Utils/ClientAppPOMTestData.json')));

for(let data of testData){
test(`Placing order for ${data.productName}`,async({page})=>{
        const productName:string=data.productName;
        const userEmail:string=data.userEmail;
        const userPassword:string=data.userPassword;
        const poManager:POManager=new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(userEmail,userPassword);
        const dashboardPage=poManager.getDashboardPage();
        await dashboardPage.verifyProduct();
        await dashboardPage.addToCart(productName);
        await dashboardPage.goToCartPage();
        const cartPage=poManager.getCartPage();
        await expect(cartPage.verifyProductInCart(productName)).toBeTruthy();
        cartPage.goToCheckOut();
        const checkOutPage=poManager.getChechOutPage();
        await checkOutPage.fillCheckOutPage("Ind","12","20","Test Card",userEmail);
        await checkOutPage.placeOrder();
        const confirmationPage=poManager.getConfirmationPage();
        await expect(await confirmationPage.getConfirmationText()).toContain("Thankyou for the order.");
        const orderID:any= await confirmationPage.getOrderId();
        await confirmationPage.navigateToMyOrders();
        const ordersPage=poManager.getOrdersPage();
        await expect(await ordersPage.checkOrderSummary(orderID)).toContain(orderID);
});
}

