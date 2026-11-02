import {type Page, test as base} from '@playwright/test';

type MyFixtures = {
    fruitsUrl: string;
    fruitsPage: Page;
    mockedFruitsPage: Page;
};

export const test = base.extend<MyFixtures>({
    fruitsUrl: async ({}, use) => {
        await use('https://demo.playwright.dev/api-mocking/');
    },

    fruitsPage: async ({page, fruitsUrl}, use) => {
        await page.goto(fruitsUrl);

        // Provide the prepared page to the test
        await use(page);

        // Cleanup runs after the test finishes
        await page.close();
    },

    mockedFruitsPage: async ({page, fruitsUrl}, use) => {
        await page.route('**/api/v1/fruits', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    {id: 101, name: 'QA Automation Apple'},
                    {id: 102, name: 'Playwright Banana'}
                ])
            });
        });

        await page.goto(fruitsUrl);

        await use(page);
    }
});

export {expect} from '@playwright/test';
