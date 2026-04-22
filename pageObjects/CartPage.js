class CartPage{
    constructor(page){
        this.page=page;
        this.lastOrder=page.locator('div li').last();
        this.checkOutButton=page.locator('text=Checkout');
    }

    async verifyProductInCart(productName){
        await this.lastOrder.waitFor();
        return await this.page.locator('h3', { hasText: productName }).isVisible();
    }
    async goToCheckOut(){
        await this.checkOutButton.click();

    }
}
module.exports={CartPage};