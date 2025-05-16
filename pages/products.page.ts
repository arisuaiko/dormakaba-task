import {expect, Locator, Page, test} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    readonly men_main_category: Locator;
    readonly men_jeans_sub_category: Locator;

    readonly products_title: Locator;

    readonly products: Locator;
    readonly products_cards: Locator;

    readonly modal_content: Locator;
    readonly modal_content_header: Locator;
    readonly modal_content_view_cart: Locator;
    readonly modal_content_continue_button: Locator;

    constructor(page: Page) {
        this.page = page;

        this.men_main_category = page.locator('a[href="#Men"]').getByText('Men');
        this.men_jeans_sub_category = page.getByRole('link', {name: 'Jeans'});

        this.products_title = page.getByRole('heading', {name: 'Men - Jeans Products'});

        this.products = page.locator('.features_items .col-sm-4');
        this.products_cards = page.locator('.features_items .single-products');

        this.modal_content = page.locator('.modal-content');
        this.modal_content_header = this.modal_content.getByRole('heading', {name: 'Added!'});
        this.modal_content_view_cart = this.modal_content.getByRole('link', {name: 'View Cart'});
        this.modal_content_continue_button = this.modal_content.getByRole('button', {name: 'Continue Shopping'});
    }

    async navigateToMenJeans() {
        await test.step('Select Category', async () => {
            await this.men_main_category.click();
        });
        await test.step('Select Sub-Category', async () => {
            await this.men_jeans_sub_category.click();
        });
    }

    async addProductsToTheCart(number_of_products = 3) {
        await test.step('Add products to cart', async () => {
            const products_to_add = Math.min(await this.products.count(), number_of_products);

            if (products_to_add === 0) {
                throw new Error('No products found to add to cart');
            }

            for (let i = 0; i < products_to_add; i++) {
                const product = this.products_cards.nth(i);
                const product_name = await product.locator('.productinfo p').textContent();

                await test.step(`Adding product ${i + 1}/${products_to_add}: ${product_name || 'Unknown'}`, async () => {
                    // Scroll and hover to make sure the product is visible
                    await product.scrollIntoViewIfNeeded();
                    await product.hover();

                    // Add product to cart
                    const add_to_cart_button = product.locator('.overlay-content .add-to-cart');
                    await add_to_cart_button.scrollIntoViewIfNeeded();
                    await add_to_cart_button.click();

                    // Verify modal appears with correct header
                    await expect.soft(this.modal_content_header, 'Modal confirmation is visible').toBeVisible({timeout: 5000});
                    await expect.soft(this.modal_content_header, 'Modal confirms item was added').toHaveText('Added!');

                    // For the last product, click 'view cart'; otherwise click 'continue shopping'
                    if (i === products_to_add - 1) {
                        await this.modal_content_view_cart.click();
                    } else {
                        await this.modal_content_continue_button.click();
                    }
                });
            }
        });
    }
}