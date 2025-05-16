import {BrowserContext, expect, Locator, Page, test} from "@playwright/test";
import * as allure from 'allure-js-commons';
import {ContentType} from 'allure-js-commons';

export class Helpers {
    readonly page: Page;
    readonly context: BrowserContext;

    readonly cookie_dialog: Locator;
    readonly cookie_dialog_consent_button: Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;

        this.cookie_dialog = page.getByLabel('This site asks for consent to use your data');
        this.cookie_dialog_consent_button = page.getByRole('button', {name: 'Consent'})
    }

    async acceptCookies() {
        await test.step('Accept cookies', async () => {
            if (await this.cookie_dialog.isVisible({ timeout: 5000 })) {
                await this.cookie_dialog_consent_button.click();
                await expect.soft(this.cookie_dialog).toBeHidden();
            } else {
                throw new Error('Cookie dialog not found or already accepted');
            }
        });
    }

    async takeAndAttachScreenshot(name: string): Promise<void> {
        await test.step(`Take screenshot: ${name}`, async () => {
            const buffer = await this.page.screenshot({timeout: 10000});
            await allure.attachment(name, buffer, ContentType.PNG);
        });
    }
}
