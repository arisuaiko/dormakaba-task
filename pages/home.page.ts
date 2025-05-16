import { Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    readonly header_products_link: Locator;

    constructor(page: Page) {
        this.page = page;

        this.header_products_link = page.getByRole('link', { name: 'Products'});

    }

    async goToHomePage() {
        await this.page.goto(`/`);
    }
}