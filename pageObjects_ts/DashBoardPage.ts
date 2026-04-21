import { Page,Locator } from "@playwright/test";

export class DashboardPage{
    page:Page;
    firstProduct:Locator;
    producList:Locator;
    cartLink:Locator;




    constructor(page:Page){
        this.page=page;
        this.firstProduct=page.locator('.card-body').first();
        this.producList=page.locator('.card-body');
        this.cartLink=page.locator('[routerlink$="/dashboard/cart"]');
    }

    async verifyProduct(){
        await this.page.waitForLoadState('networkidle');
        await this.firstProduct.waitFor();
    };

    async addToCart(productName:string){
            const prodCount:number=await this.producList.count();
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