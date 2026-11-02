import {expect, test} from '@playwright/test';

test('should reject regular users accessing admin API', async ({page}) => {
    await page.route('**/api/admin/users', async route => {
        await route.fulfill({
            status: 403,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Forbidden'
            })
        });
    });

    await page.goto('http://example.com');

    const response = await page.evaluate(async () => {
        const result = await fetch('/api/admin/users');

        return {
            status: result.status,
            body: await result.json()
        };
    });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden');
});
