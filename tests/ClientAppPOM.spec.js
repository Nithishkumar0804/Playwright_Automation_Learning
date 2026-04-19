const {test, expect}= require ('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const{DashboardPage}=require('../pageObjects/DashBoardPage');
const{CartPage}=require('../pageObjects/CartPage');
const{CheckOutPage}=require('../pageObjects/CheckOutPage');
const{ConfirmationPage}=require('../pageObjects/ConfirmationPage');
const{OrdersPage}=require('../pageObjects/OrdersPage');


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
        const confirmationPage=new ConfirmationPage(page);
        await expect(await confirmationPage.getConfirmationText()).toHaveText("Thankyou for the order.");
        const orderID= await confirmationPage.getOrderId();
        await confirmationPage.navigateToMyOrders();
        const ordersPage=new OrdersPage(page);
        await expect(await ordersPage.checkOrderSummary(orderID)).toContain(orderID);
});

