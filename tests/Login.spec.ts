/**
 * Test Case: login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * steps:
 * * 1. Navigate to the application url
 * 2.Navigate to Home Page via Home Page
 * 3. Enter Valid Credential and click on login button
 * 4. Verify successful login by checking 'My account' page presence
 */

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';

let config: TestConfig;
let homePage: HomePage;
let loginPage: LoginPage;
let myAccountPage: MyAccountPage;

//This hook run before each Test 
test.beforeEach(async ({ page }) => {
    config = new TestConfig(); //load config (url, credentials)
    await page.goto(config.appUrl); // Navigate to the application URL

    //Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
})

//Optional cleanup after test
test.afterEach(async ({ page }) => {
    await page.close(); // Close the browser after each test
})

test('User login with valid credentials', async ({ page }) => {
    //Navigate to Login page
    await homePage.clickMyAccount();
    await homePage.clickLogin();    

    //Perform login with valid credentials
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    //Verify successful login by checking My Account page presence
    const isLoggedIn = await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy(); // Assert that login was successful
})


