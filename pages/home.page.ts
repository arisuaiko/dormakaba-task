import { BrowserContext, Locator, Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly header_products_link: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;

        this.header_products_link = page.getByRole('link', { name: 'Products'});

    }

    async goto() {
        await this.page.goto(`/`);
    }
}