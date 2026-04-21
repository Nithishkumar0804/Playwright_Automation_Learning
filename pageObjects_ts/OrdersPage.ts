import { Page,Locator } from "@playwright/test";
import { error } from "node:console";

export class OrdersPage {
    page:Page;
    rows:Locator;
    orderIdinSummaryPage:Locator;


    constructor(page:Page){
        this.page = page;
        this.rows = page.locator("tbody tr");
        this.orderIdinSummaryPage = page.locator(".col-text");
    }

    async checkOrderSummary(ordId:any){
        await this.rows.first().waitFor();
        const count = await this.rows.count();
        for(let i = 0; i < count; i++){
            const rowID = await this.rows.nth(i).locator("th").textContent();
            if(rowID && ordId.includes(rowID)){
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
        await this.orderIdinSummaryPage.waitFor();
        const orderIDsummary=await this.orderIdinSummaryPage.textContent();
        if(!orderIDsummary){
            throw new Error("Order ID not found xon summary page");
        }
        return orderIDsummary.trim();
    }
}