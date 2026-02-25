import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {

    private readonly page: Page;

    // Locators
    private readonly txtFirstname: Locator;
    private readonly txtLastname: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    // 🔥 NEW – Newsletter Locator
    private readonly radioNewsletterYes: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtFirstname = page.locator('#input-firstname');
        this.txtLastname = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[value="Continue"]');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');

        // 🔥 Initialize Newsletter locator here
        this.radioNewsletterYes = page.locator('input[name="newsletter"][value="1"]');
    }

    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstname.fill(fname);
    }

    async setLastName(lname: string): Promise<void> {
        await this.txtLastname.fill(lname);
    }

    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    async setTelephone(tel: string): Promise<void> {
        await this.txtTelephone.fill(tel);
    }

    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    async setConfirmPassword(confirmPassword: string): Promise<void> {
        await this.txtConfirmPassword.fill(confirmPassword);
    }

    async checkPrivacyPolicy(): Promise<void> {
        await this.chkdPolicy.check();
    }

    // 🔥 NEW – Select Newsletter
    async selectNewsletterYes(): Promise<void> {
        await this.radioNewsletterYes.check();
    }

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async verifyAccountCreation(): Promise<void> {
        await expect(this.msgConfirmation)
            .toContainText("Your Account Has Been Created!");
    }

    async registerUser(userData: {
        fname: string,
        lname: string,
        email: string,
        tel: string,
        password: string,
        subscribeNewsletter?: boolean
    }): Promise<void> {

        await this.setFirstName(userData.fname);
        await this.setLastName(userData.lname);
        await this.setEmail(userData.email);
        await this.setTelephone(userData.tel);
        await this.setPassword(userData.password);
        await this.setConfirmPassword(userData.password);

        // Optional Newsletter selection
        if (userData.subscribeNewsletter) {
            await this.selectNewsletterYes();
        }

        await this.checkPrivacyPolicy();
        await this.clickContinue();
    }
}