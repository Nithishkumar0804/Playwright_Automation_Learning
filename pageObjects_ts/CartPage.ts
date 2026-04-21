import { Page,Locator } from "@playwright/test";

export class CartPage{
    page:Page;
    lastOrder:Locator;
    checkOutButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.lastOrder=page.locator('div li').last();
        this.checkOutButton=page.locator('text=Checkout');
    }

    async verifyProductInCart(productName:string){
        await this.lastOrder.waitFor();
        await this.page.locator('h3', { hasText: productName });
    }
    async goToCheckOut(){
        await this.checkOutButton.click();

    }
}