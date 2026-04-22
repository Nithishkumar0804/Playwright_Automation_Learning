const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../pageObjects/POManager');
const { chromium, expect } = require('@playwright/test');

Given('login to Ecommerce application with {string} and {string}', async function (userEmail, userPassword) {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.userEmail = userEmail;
    this.poManager = new POManager(this.page);
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(userEmail, userPassword);
});

When('Add {string} to Cart', async function (productName) {
    this.productName = productName;
    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.verifyProduct();
    await dashboardPage.addToCart(productName);
    await dashboardPage.goToCartPage();
});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await expect(await cartPage.verifyProductInCart(productName)).toBeTruthy();
    await cartPage.goToCheckOut();
});

When('Enter valid card details and Place the Order', async function () {
    const checkOutPage = this.poManager.getChechOutPage();
    await checkOutPage.fillCheckOutPage(
        "Ind",
        "12",
        "20",
        "Test Card",
        this.userEmail
    );
    await checkOutPage.placeOrder();
});

Then('Verify order is present in the OrderHistory', async function () {
    const confirmationPage = this.poManager.getConfirmationPage();
    await expect(await confirmationPage.getConfirmationText()).toContain("Thankyou for the order.");
    const orderID = await confirmationPage.getOrderId();
    await confirmationPage.navigateToMyOrders();
    const ordersPage = this.poManager.getOrdersPage();
    await expect(await ordersPage.checkOrderSummary(orderID)).toContain(orderID);
    await this.browser.close();
});