import {expect, test} from '../fixtures/fixtures'

// Define expected cart products
const expected_cart_products = [
    'Soft Stretch Jeans',
    'Regular Fit Straight Jeans',
    'Grunt Blue Slim Fit Jeans'
];

test.describe('Shopping Cart Functionality', () => {
    test.beforeEach(async ({home, helper}) => {
        await home.goToHomePage();
        await helper.acceptCookies();
    });

    test('User can add men\'s jeans to cart and verify cart contents', async ({page, home, products, cart, helper}) => {
        await test.step('Navigate to Products page', async () => {
            await home.header_products_link.click();
            await expect.soft(page, 'Product page is opened').toHaveURL(/\/products$/);
            await expect.soft(home.header_products_link, 'Product link in the header highlighted by orange color').toHaveCSS('color', 'rgb(255, 165, 0)');
        });

        await test.step('Select Jeans for the Men Category', async () => {
            await products.navigateToMenJeans();
            await expect.soft(products.products_title, 'Title on the product page contains Men - Jeans Products').toHaveText('Men - Jeans Products');
            await expect.soft(products.products, 'The amount of products after selecting category is 3').toHaveCount(3);
        });

        await test.step('Add a couple of items in the cart', async () => {
            await products.addProductsToTheCart();
        });

        await test.step('Verify that the products were added to the cart', async () => {
            await expect.soft(page, 'Cart page is opened').toHaveURL(/\/view_cart$/);
            await expect.soft(cart.header_cart_link, 'Cart link in the header highlighted by orange color').toHaveCSS('color', 'rgb(255, 165, 0)');
            await cart.verifyEachItemInTheCart(expected_cart_products);

            // Capture final state screenshot
            await helper.takeAndAttachScreenshot('cart-verification');
        });
    });
});