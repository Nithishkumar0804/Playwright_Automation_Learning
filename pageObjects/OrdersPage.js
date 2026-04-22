class OrdersPage {
    constructor(page){
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.orderIdinSummaryPage = page.locator(".col-text");
    }

async checkOrderSummary(ordId){
    await this.rows.first().waitFor();
    const count = await this.rows.count();
    for(let i = 0; i < count; i++){
        const rowID = (await this.rows.nth(i).locator("th").textContent()).trim();
        if(rowID.includes(ordId)){
            await this.rows.nth(i).locator("button").first().click();
            await this.orderIdinSummaryPage.waitFor();
            const orderIDsummary = (await this.orderIdinSummaryPage.textContent()).trim();

            return orderIDsummary || "Not Found";
        }
    }
    return " ";
}
}
module.exports={OrdersPage};