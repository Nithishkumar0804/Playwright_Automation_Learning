class DashboardPage{

    constructor(page){
        this.page=page;
        this.firstProduct=page.locator('.card-body').first();
        this.producList=page.locator('.card-body');
        this.cartLink=page.locator('[routerlink$="/dashboard/cart"]');
    }

    async verifyProduct(){
        await this.page.waitForLoadState('networkidle');
        await this.firstProduct.waitFor();
    };

    async addToCart(productName){
            const prodCount=await this.producList.count();
             for(let i=0;i<prodCount;i++){
                if(await this.producList.nth(i).locator('b').textContent()===productName){
                       await this.producList.nth(i).locator("button[style*='float']").click();
                       break;
                }
        }
    };

    async goToCartPage(){
        await this.cartLink.click();
    }
}
module.exports={DashboardPage};