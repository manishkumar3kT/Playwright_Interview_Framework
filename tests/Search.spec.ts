import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPages';
import { TestConfig } from '../test.config';
/* Verify user can search valid product
Test Steps:
Open application
Enter product name "MacBook" in search box
Click Search button
Verify Search Results page is displayed
Verify product "MacBook" is listed

Expected Result
Search results page should load
"MacBook" should be displayed in results
*/

test('TC_SEARCH_001 - Search valid product', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("MacBook");
    await page.waitForTimeout(2000);

    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);

    await expect(await searchPage.isSearchResultsPageExists()).toBeTruthy();
    await page.waitForTimeout(2000);

    await expect(await searchPage.isProductExist("MacBook")).toBeTruthy();
    await page.waitForTimeout(2000);
});

/* Verify search with invalid product name
Test Steps:
Open application
Enter invalid product name "ABCXYZ123"
Click Search
Verify "No products found" message

Expected Result
Search page should display
No products should be listed
*/

test('TC_SEARCH_002 - Search invalid product', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("ABCXYZ123");
    await page.waitForTimeout(2000);

    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);

    await expect(await searchPage.isSearchResultsPageExists()).toBeTruthy();
    await page.waitForTimeout(2000);

    await expect(await searchPage.getProductCount()).toBe(0);
    await page.waitForTimeout(2000);
});
/* Verify partial keyword search
Test Steps:
Open application
Enter partial keyword "Mac"
Click Search
Verify related products appear

Expected Result
All products containing "Mac" should appear
*/

test('TC_SEARCH_003 - Partial keyword search', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("Mac");
    await page.waitForTimeout(2000);

    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);

    await expect(await searchPage.getProductCount()).toBeGreaterThan(0);
    await page.waitForTimeout(2000);
});

/*Verify search is case insensitive
Test Steps:
Open application
Enter lowercase "macbook"
Click Search
Verify product is displayed

Expected Result
Search should return "MacBook"
*/
test('TC_SEARCH_004 - Case insensitive search', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("macbook");
    await page.waitForTimeout(2000);

    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);

    await expect(await searchPage.isProductExist("MacBook")).toBeTruthy();
    await page.waitForTimeout(2000);
});

/* Verify user can navigate to product details from search results
Test Steps:
Open application
Search "iMac"
Click product from results
Verify product details page is displayed

Expected Result
Product details page should load
Product title should match
*/
test('TC_SEARCH_005 - Navigate to product detail page from search', async ({ page }) => {

    const config = new TestConfig();
    await page.goto(config.appUrl);
    await page.waitForTimeout(2000);

    const homePage = new HomePage(page);
    await homePage.enterProductNameInSearchBox("iMac");
    await page.waitForTimeout(2000);

    await homePage.clickSearchButton();
    await page.waitForTimeout(2000);

    const searchPage = new SearchResultsPage(page);

    const productPage = await searchPage.selectProduct("iMac");
    await page.waitForTimeout(2000);

    await expect(page).toHaveURL(/product/);
    await page.waitForTimeout(2000);
});