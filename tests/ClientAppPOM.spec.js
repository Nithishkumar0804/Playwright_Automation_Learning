const {test, expect}= require ('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const testData=JSON.parse(JSON.stringify(require('../Utils/ClientAppPOMTestData.json')));

for(let data of testData){
test(`Placing order for ${data.productName}`,async({page})=>{
        const productName=data.productName;
        const userEmail=data.userEmail;
        const userPassword=data.userPassword;
        const poManager=new POManager(page);

        const loginPage = poManager.getLoginPage(page);
        await loginPage.goTo();
        await loginPage.validLogin(userEmail,userPassword);
        const dashboardPage=poManager.getDashboardPage(page);
        await dashboardPage.verifyProduct();
        await dashboardPage.addToCart(productName);
        await dashboardPage.goToCartPage();
        const cartPage=poManager.getCartPage(page);
        await expect(cartPage.verifyProductInCart(productName)).toBeTruthy();
        cartPage.goToCheckOut();
        const checkOutPage=poManager.getChechOutPage(page);
        await checkOutPage.fillCheckOutPage("Ind","12","20","Test Card",userEmail);
        await checkOutPage.placeOrder();
        const confirmationPage=poManager.getConfirmationPage(page);
        await expect(await confirmationPage.getConfirmationText()).toHaveText("Thankyou for the order.");
        const orderID= await confirmationPage.getOrderId();
        await confirmationPage.navigateToMyOrders();
        const ordersPage=poManager.getOrdersPage(page);
        await expect(await ordersPage.checkOrderSummary(orderID)).toContain(orderID);
});
}

