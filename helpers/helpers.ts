import {BrowserContext, expect, Locator, Page, test, TestInfo} from "@playwright/test";

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
            try {
                expect.soft(this.cookie_dialog, 'Cookie dialog is visible').toBeVisible({visible: true});
                await this.cookie_dialog_consent_button.click();
                expect.soft(this.cookie_dialog, 'Cookie dialog is hidden').toBeHidden();
            }
            catch (error) {
                console.log('Cookie dialog not found or already accepted');
            }
        });
    }

    async takeAndAttachScreenshot(name: string, testInfo: TestInfo): Promise<void> {
        await test.step("Take screenshot", async () => {
            let screenshot: Buffer;
            screenshot = await this.page.screenshot({ path: `./screenshots/${name}-${Date.now()}.png`, timeout: 10000});
            await testInfo.attach(name, {body: screenshot, contentType: "image/png"});
        });

    }
}
