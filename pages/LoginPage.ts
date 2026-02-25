import {Page, Locator} from '@playwright/test';

export class LoginPage{
    private readonly page:Page;

    //Locators
    private readonly txtEmailAddress:Locator;
    private readonly txtPassword:Locator;
    private readonly btnLogin:Locator;
    private readonly txtErrorMessage:Locator;

    constructor(page:Page){
        this.page=page;

        //initialize locators with CSS selectors
        this.txtEmailAddress=page.locator('#input-email');
        this.txtPassword=page.locator('#input-password');
        this.btnLogin=page.locator('input[value="Login"]');
        this.txtErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
    }

    /**
     * Sets the email address in the email field
     * @param email - Email address to enter
     */ 
    async setEmail(email:string){
        await this.txtEmailAddress.fill(email);
 }
 /**
  * Sets the password in the password field
  * @param password - Password to enter
  */
    async setPassword(password:string){
        await this.txtPassword.fill(password);
    }
 /**
  * Clicks the login button
  */
 async clickLogin(){
    await this.btnLogin.click();
 }

 async login(email:string,password:string){
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
 }

 async getloginErrorMessage():Promise<null | string>{
    return(this.txtErrorMessage.textContent());
 }

}