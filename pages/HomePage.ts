import {Page,expect,Locator} from '@playwright/test';

export class HomePage{

private readonly page:Page;
//Locators
private readonly MyAccount:Locator;
private readonly Register:Locator;
private readonly Login:Locator;
private readonly SearchBox:Locator;
private readonly SearchButton:Locator;

//constructor
constructor(page:Page){
    this.page=page;
    this.MyAccount=page.locator(`span:has-text("My Account")`);
    this.Register=page.locator(`a:has-text("Register")`);
    this.Login=page.locator(`a:has-text("Login")`);
    this.SearchBox=page.locator('[name="search"]');
    this.SearchButton=page.locator(`.fa.fa-search`);
}

//action Methods

//check is home page exists
async isHpmePageExist(){

    let title:string=await this.page.title();
    if(title){
        return true;
    } 
    return false;
}
//click on My Account link
async clickMyAccount(){
    try{
        await this.MyAccount.click();
    }catch(error){
        console.log(`Exception occurred while clicking My Account link: ${error}`);
        throw error;
    }
}

//click on Register link
async clickRegister(){
    try{
        await this.Register.click();
    }catch(error){
        console.log(`Exception occurred while clicking Register link: ${error}`);
        throw error;
    }
}
//click on Login link
async clickLogin(){
    try{
        await this.Login.click();
    }catch(error){
        console.log(`Exception occurred while clicking Login link: ${error}`);
        throw error;
    }
}
// enter product name in search box
async enterProductNameInSearchBox(productName:string){
    try{
        await this.SearchBox.fill(productName);
    }catch(error){
        console.log(`Exception occurred while entering product name in search box: ${error}`);
        throw error;
    }
}
//click the search button
async clickSearchButton(){
    try{
        await this.SearchButton.click();    
    }catch(error){
        console.log(`Exception occurred while clicking search button: ${error}`);
        throw error;
    }
    }
}