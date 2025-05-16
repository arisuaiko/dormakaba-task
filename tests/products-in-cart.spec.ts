import { test, expect, TestInfo } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import {Helpers} from "../helpers/helpers";
import {ProductsPage} from "../pages/products.page";
import {CartPage} from "../pages/cart.page";

// Define expected cart products
const expected_cart_products = [
    'Soft Stretch Jeans',
    'Regular Fit Straight Jeans',
    'Grunt Blue Slim Fit Jeans'
];

test.describe('Shopping Cart Functionality', () => {
    test.beforeEach(async ({page, context}) => {
        const homePage = new HomePage(page, context);
        await homePage.goto();
        const helper = new Helpers(page, context);
        await helper.acceptCookies();
    });

    test('User can add men\'s jeans to cart and verify cart contents', async ({page, context}, testInfo) => {
        const homePage = new HomePage(page, context);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page, testInfo);
        const helper = new Helpers(page, context);

        await test.step('Navigate to Products page', async () => {
            await homePage.header_products_link.click();
            await expect.soft(page, 'Product page is opened').toHaveURL(/\/products$/);
            await expect.soft(homePage.header_products_link, 'Product link in the header highlighted by orange color').toHaveCSS('color', 'rgb(255, 165, 0)');
        });

        await test.step('Select Jeans for the Men Category', async () => {
            await productsPage.navigateToMenJeans();
            await expect.soft(productsPage.products_title, 'Title on the product page contains Men - Jeans Products').toHaveText('Men - Jeans Products');
            await expect.soft(productsPage.products, 'The amount of products after selecting category is 3').toHaveCount(3);
        });

        await test.step('Add a couple of items in the cart', async () => {
            await productsPage.addProductsToTheCart();
        });

        await test.step('Verify that the products were added to the cart', async () => {
            await expect.soft(page, 'Cart page is opened').toHaveURL(/\/view_cart$/);
            await expect.soft(cartPage.header_cart_link, 'Cart link in the header highlighted by orange color').toHaveCSS('color', 'rgb(255, 165, 0)');
            await cartPage.verifyEachItemInTheCart(expected_cart_products);

            // Capture final state screenshot
            await helper.takeAndAttachScreenshot('cart-verification', cartPage.testInfo);
        });
    });
});