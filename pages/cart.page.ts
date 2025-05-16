import {expect, Locator, Page} from '@playwright/test';

export class CartPage {
    readonly page: Page;

    readonly cart_rows: Locator;
    readonly header_cart_link: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cart_rows = page.locator('#cart_info_table tbody tr');
        this.header_cart_link = page.getByRole('link', {name: 'Cart'});
    }

    async verifyEachItemInTheCart(expected_products: string[]) {
        // Check total number of items
        const itemCount = await this.cart_rows.count();
        expect.soft(itemCount, 'Cart contains the expected number of items').toBe(expected_products.length);

        // For each product in the cart
        for (let i = 0; i < expected_products.length; i++) {
            const productRow = this.cart_rows.nth(i);

            // Get product names
            const productName = await productRow.locator('h4 a').textContent();
            const quantity = await productRow.locator('.cart_quantity button').textContent();

            // Verify name and quantity
            expect.soft(productName?.trim(), `Product at position ${i + 1} has correct name`).toBe(expected_products[i]);
            expect.soft(quantity?.trim(), `Product "${expected_products[i]}" has quantity of 1`).toBe('1');
        }
    }
}
