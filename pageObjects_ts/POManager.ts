import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from "./DashBoardPage";
import { CartPage } from "./CartPage";
import { CheckOutPage } from "./CheckOutPage";
import { ConfirmationPage } from "./ConfirmationPage";
import {OrdersPage} from "./OrdersPage";

export class POManager{
    page:Page;
    loginPage:LoginPage;
    dashboardPage:DashboardPage;
    cartPage:CartPage;
    checkOutPage:CheckOutPage;
    confirmationPage:ConfirmationPage;
    ordersPage:OrdersPage;

    constructor(page:Page){
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