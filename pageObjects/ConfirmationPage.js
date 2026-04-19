class ConfirmationPage{
    constructor(page){
        this.page=page;
        this.confimrationText=this.page.locator("h1[class$='hero-primary']");
        this.ordId=page.locator("label[class$='ng-star-inserted']");
        this.myorderLink=page.locator("button[routerlink$='/myorders']");
    }
    getConfirmationText() {
        return this.confimrationText;
    }
    async getOrderId(){
        let ordID1=await this.ordId.textContent();
        let firstSplit=await ordID1.split("| ")[1];
        const correctOrdId=await firstSplit.split(" |")[0].trim();
        return correctOrdId;
    }
    async navigateToMyOrders(){
        await this.myorderLink.click();
    }
}
module.exports={ConfirmationPage};