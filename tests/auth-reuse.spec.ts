import {expect, test} from '@playwright/test';


test('should access secure page using saved session', async ({page}) => {
    await page.goto('/secure');

    await expect(page).toHaveURL('/secure');
    await expect(
        page.getByText('Welcome to the Secure Area.')
    ).toBeVisible();
});
