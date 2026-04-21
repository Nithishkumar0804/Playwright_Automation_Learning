import { Page,Locator } from "@playwright/test";

export class CheckOutPage{
    page:Page;
    countrytxtBox:Locator;
    dropdown:Locator;
    selectdropdown:Locator;
    cvvNumberBox:Locator;
    cardName:Locator;
    userEmail:Locator;
    placeOrderButton:Locator;

    constructor(page:Page){
        this.page=page;
        this.countrytxtBox=page.locator("input[class$='text-validated']").nth(1);
        this.dropdown=page.locator(".ta-results");
        this.selectdropdown=page.locator("select");
        this.cvvNumberBox=page.locator("div[class$='small'] input[class$='txt']");
        this.cardName=page.locator("div[class$='field'] input[class$='txt']");
        this.userEmail=page.locator(".user__name label[type='text']");
        this.placeOrderButton=page.locator("div[class='actions'] a");
        

    }

    async fillCheckOutPage(countryName:string,month:string,day:string,cvvNumber:string,CardName:string){
        await this.countrytxtBox.pressSequentially(countryName);
        await this.dropdown.waitFor();
        const dpCount=await this.dropdown.locator("button").count();
        for(let i=0;i<dpCount;i++){
                const text = await this.dropdown.locator("button").nth(i).textContent();
                if(text && text.trim()==="India"){
                        await this.dropdown.locator("button").nth(i).click();
                        break;
                }
        }
        await this.selectdropdown.nth(0).waitFor();
        await this.selectdropdown.nth(0).selectOption(month);
        await this.selectdropdown.nth(1).waitFor();
        await this.selectdropdown.nth(1).selectOption(day);
        await this.cvvNumberBox.fill("123");
        await this.cardName.fill("Test Card");

    }
    async placeOrder(){
        await this.placeOrderButton.click();
    }
}