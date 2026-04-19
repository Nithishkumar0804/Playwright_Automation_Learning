const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashBoardPage');
const { CartPage } = require('./CartPage');
const { CheckOutPage } = require('./CheckOutPage');
const { ConfirmationPage } = require('./ConfirmationPage');
const { OrdersPage } = require('./OrdersPage');

class POManager{
    constructor(page){
        this.page=page;
        this.loginPage= new LoginPage(this.page);
        this.dashboardPage=new DashboardPage(this.page);
        this.cartPage=new CartPage(this.page);
        this.checkOutPage=new CheckOutPage(this.page);
        this.confirmationPage=new ConfirmationPage(this.page);
        this.ordersPage=new OrdersPage(this.page);
    }
    getLoginPage(){
        return this.loginPage;
    }
    getDashboardPage(){
        return this.dashboardPage;
    }
    getCartPage(){
        return this.cartPage;
    }
    getChechOutPage(){
        return this.checkOutPage;
    }
    getConfirmationPage(){
        return this.confirmationPage;
    }
    getOrdersPage(){
        return this.ordersPage;
    }
}
module.exports={POManager};