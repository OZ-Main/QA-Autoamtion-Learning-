import {expect, test} from '@playwright/test';
import {mockFruits} from './fixtures/fruits';


test('should display mocked fruit data', async ({page}) => {
    const fruitsRoute = "api/v1/fruits";
    const playwrightDemoUrl = 'https://demo.playwright.dev/api-mocking';

    await page.route(`**/${fruitsRoute}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(mockFruits)
        });
    });

    await page.goto(playwrightDemoUrl);


    await expect(page.getByText('QA Automation Apple')).toBeVisible();
    await expect(page.getByText('Playwright Banana')).toBeVisible();
});


test("should handle an API server error", async ({page}) => {
    const fruitsRoute = "api/v1/fruits";
    const playwrightDemoUrl = 'https://demo.playwright.dev/api-mocking';

    await page.route(`**/${fruitsRoute}`, async (route) => {
        await route.fulfill({status: 500});
    });

    const responsePromise = page.waitForResponse(
        response => response.url().includes('/api/v1/fruits')
    );

    await page.goto(playwrightDemoUrl);

    const response = await responsePromise;

    expect(response.status()).toBe(500);
    await expect(page.getByText('Strawberry')).toBeHidden();
    await expect(page.getByText('Watermelon')).toBeHidden();
})