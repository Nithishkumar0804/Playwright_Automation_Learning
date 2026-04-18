class LoginPage{
    constructor(page){
        this.page=page;
        this.userEmail=page.locator('[placeholder*="email@"]');
        this.userPassword=page.locator('#userPassword');
        this.sumbitButton=page.locator('[type*="submit"]');
    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async validLogin(userEmail,userPassword){
        await this.userEmail.fill(userEmail);
        await this.userPassword.fill(userPassword);
        await this.sumbitButton.click();
    }

}
module.exports={LoginPage};