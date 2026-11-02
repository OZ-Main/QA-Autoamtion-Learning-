import {expect, test} from '@playwright/test';

test('should deny access to unauthenticated users', async ({page}) => {
    await page.goto('/secure');

    await expect(page).toHaveURL('/login');

    await expect(
        page.locator('#flash')
    ).toContainText('You must login to view the secure area!');
});
