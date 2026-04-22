import { Page,Locator } from "@playwright/test";
export class ConfirmationPage{
    page:Page;
    confimrationText:Locator;
    ordId:Locator;
    myorderLink:Locator;

    constructor(page:Page){
        this.page=page;
        this.confimrationText=this.page.locator("h1[class$='hero-primary']");
        this.ordId=page.locator("label[class$='ng-star-inserted']");
        this.myorderLink=page.locator("button[routerlink$='/myorders']");
    }
     async getConfirmationText() {
        const text:any = await this.confimrationText.textContent();
        return text.trim() || "";
    }
    
    async getOrderId(){
        let ordID1:any=await this.ordId.textContent();
        let firstSplit=await ordID1.split("| ")[1];
        const correctOrdId=await firstSplit.split(" |")[0].trim();
        return correctOrdId;
    }
    async navigateToMyOrders(){
        await this.myorderLink.click();
    }
}