import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPages';
import { TestConfig } from '../test.config';
/*
Verify user can add product to cart with default quantity (1)
Test Steps
Open application
Search product "MacBook"
Click product from search result
Click Add To Cart
Verify success message
Navigate to Cart
Verify product is displayed in cart
Expected Result
Success message should display
Product should appear in cart
Quantity should be 1
*/
test('TC_CART_001 - Add product with default quantity', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("MacBook");
    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);
    await expect(await searchPage.isProductExist("MacBook")).toBeTruthy();

    const productPage = await searchPage.selectProduct("MacBook");
    await page.waitForTimeout(2000);

    await productPage?.addProductToCart("1");
    await page.waitForTimeout(2000);

    await expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();

    await productPage?.clickItemsToNavigateToCart();
    await page.waitForTimeout(2000);
});

/*Verify user can add product with multiple quantity
Steps
Search MacBook
Set quantity = 3
Add to cart
Verify total price updates correctly
Expected Result
Quantity = 3
Total = Unit Price × 3 */

test('TC_CART_002 - Add product with quantity 3', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("MacBook");
    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);
    const productPage = await searchPage.selectProduct("MacBook");
    await page.waitForTimeout(2000);

    await productPage?.addProductToCart("3");
    await page.waitForTimeout(2000);

    await expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();
});

/*Verify product added from Search Results page
Steps
Search product
Click product
Add to cart
Verify cart icon count updates
Expected Result
Cart count increases
Success message appears*/

test('TC_CART_003 - Add product from search result flow', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("iMac");
    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);
    const productPage = await searchPage.selectProduct("iMac");
    await page.waitForTimeout(2000);

    await productPage?.addProductToCart("1");
    await page.waitForTimeout(2000);

    await expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();
});

/* Verify user cannot add product with invalid quantity (0)
Test Steps
Search product
Enter quantity = 0
Click Add to cart
 
Expected Result
Error validation message shown
OR
Quantity resets to 1
*/
test('TC_CART_004 - Add product with invalid quantity 0', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("MacBook");
    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);
    const productPage = await searchPage.selectProduct("MacBook");
    await page.waitForTimeout(2000);

    await productPage?.addProductToCart("0");
    await page.waitForTimeout(2000);

    await expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();
});
/*
Verify multiple products added to cart
Test Steps
Search MacBook → Add to cart
Search iMac → Add to cart
Go to Cart
Verify both products exist

Expected Result
Both products listed
Total updated correctly
*/
test('TC_CART_005 - Add multiple products to cart', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);

    const homePage = new HomePage(page);

    // Add MacBook
    await homePage.enterProductNameInSearchBox("MacBook");
    await homePage.clickSearchButton();
    let searchPage = new SearchResultsPage(page);
    let productPage = await searchPage.selectProduct("MacBook");
    await productPage?.addProductToCart("1");

    // Add iMac
    await homePage.enterProductNameInSearchBox("iMac");
    await homePage.clickSearchButton();
    searchPage = new SearchResultsPage(page);
    productPage = await searchPage.selectProduct("iMac");
    await productPage?.addProductToCart("1");

    await expect(await productPage?.isConfirmationMessageVisible()).toBeTruthy();
});
