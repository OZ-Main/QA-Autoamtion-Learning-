import {expect, test} from '@playwright/test';

test('save authenticated session', async ({page}) => {
    await page.goto('/login');

    await page.locator('#username').fill('tomsmith');
    await page.locator('#password').fill('SuperSecretPassword!');

    await page.getByRole('button', {name: 'Login'}).click();

    await expect(page).toHaveURL('/secure');

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });
});
