/** 
 * Test Case: account registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * * 1. Navigate to the registration page
 * 2.Go to 'My Account' and click on 'Register' link
 * 3. Fill in the registration form with random data
 * 4 Agree tp privacy policy and submit the form
 * 5. Validate the confimation Message  
*/
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/Registration';
import { RandomDataUtil } from '../utils/randomDataGenrator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;

test.beforeEach(async ({ page }) => {
    const config = new TestConfig();
    await page.goto(config.appUrl); // Navigate to the application URL
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
})

test.afterEach(async ({ page }) => {
    await page.close(); // Close the browser after each test
})



test('User resignation test', async ({page}) => {
    const config = new TestConfig();
    await page.goto(config.appUrl);// Navigate to the application URL

    //Go to 'My Account' and click on 'Register' link
    const homePage = new HomePage(page);
    await homePage.clickMyAccount();  
    await homePage.clickRegister(); 

    // Fill in the registration form with random data
    const registrationPage = new RegistrationPage(page);

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());
    
    const Password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(Password);
    await registrationPage.setConfirmPassword(Password);

    await registrationPage.checkPrivacyPolicy();
    await registrationPage.clickContinue();
    
    // Validate confirmation message
   // Validate confirmation message
   await registrationPage.verifyAccountCreation();;

   await page.waitForTimeout(3000); // Wait for 3 seconds to observe the result

});

test('User registration with all fields including newsletter', async ({ page }) => {

    await homePage.clickMyAccount();
    await homePage.clickRegister();

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(RandomDataUtil.getEmail());
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    // Select Newsletter (Assuming method exists)
    await registrationPage.selectNewsletterYes();  // create this method in POM

    await registrationPage.checkPrivacyPolicy();
    await registrationPage.clickContinue();

    await registrationPage.verifyAccountCreation();
});

test('Validate confirmation email message after registration', async ({ page }) => {

    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const email = RandomDataUtil.getEmail();

    await registrationPage.setFirstName(RandomDataUtil.getFirstName());
    await registrationPage.setLastName(RandomDataUtil.getLastName());
    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

    const password = RandomDataUtil.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.checkPrivacyPolicy();
    await registrationPage.clickContinue();

    // Validate success page
    await registrationPage.verifyAccountCreation();

    // Optional: Validate user redirected to account page
    await expect(page).toHaveURL(/account/);
});


