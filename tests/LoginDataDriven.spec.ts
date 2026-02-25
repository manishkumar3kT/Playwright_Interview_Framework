import {test, expect} from '@playwright/test';
import { Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { DataProviders } from '../utils/dataProviders';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import path from 'path';

//Load JSON test data logindata.jason

interface LoginTestData {
    testName: string;
    email: string;
    password: string;
    Expected: string;
}

const jsonPath = "testdata/logindata.json";
const jsonTestData = DataProviders.getTestDataFromJason(jsonPath) as LoginTestData[];

for(const data of jsonTestData){

    test(`Login Test with JSON Data: ${data.testName}@data-driven`, async ({ page }: { page: Page }) => {
        //Initialize page objects

        const config: TestConfig = new TestConfig(); //Create instance of TestConfig to access appUrl and other config data
        await page.goto(config.appUrl); // Navigate to the application URL

        const homePage: HomePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        
        const loginPage = new LoginPage(page);
        await loginPage.login(data.email, data.password);

        if(data.Expected.toLowerCase() === "success"){
            const myAccountPage = new MyAccountPage(page);
            const isLoggedIn = await myAccountPage.isMyAccountPageExists();
            expect(isLoggedIn).toBeTruthy(); // Assert that login was successful
        } else{
            const errorMessage = await loginPage.getloginErrorMessage();
            expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.'); // Assert that login failed with expected error message 

        }


});
}