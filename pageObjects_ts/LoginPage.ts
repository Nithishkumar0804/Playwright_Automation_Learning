import { Page,Locator } from "@playwright/test";

export class LoginPage{
    page:Page;
    userEmail:Locator;
    userPassword:Locator;
    sumbitButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.userEmail=page.locator('[placeholder*="email@"]');
        this.userPassword=page.locator('#userPassword');
        this.sumbitButton=page.locator('[type*="submit"]');
    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userEmail:string,userPassword:string){
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPassword);
        await this.sumbitButton.click();
    }

}