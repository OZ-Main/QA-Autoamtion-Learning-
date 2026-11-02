import {expect, test} from '@playwright/test';

test('should mock an API response', async ({page}) => {
    const usersRoute = "/api/users";
    const exampleUrl = "http://example.com";

    await page.route(`**${usersRoute}`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([
                {id: 1, name: 'Test User'}
            ])
        });
    });

    await page.goto(exampleUrl);

    const response = await page.evaluate(async () => {
        const body = await fetch("/api/users");
        return body.json();
    });

    expect(response).toEqual([
        {id: 1, name: 'Test User'}
    ]);
});

test("should mock an API server error", async ({page}) => {
    const usersRoute = "/api/users";
    const exampleUrl = "http://example.com";

    await page.route(`**${usersRoute}`, async (route) => {
        await route.fulfill({
            status: 500
        })
    })

    await page.goto(exampleUrl);

    const response = await page.evaluate(async () => {
        const body = await fetch("/api/users");

        return {
            status: body.status,
            ok: body.ok
        }
    })

    expect(response.status).toBe(500);
    expect(response.ok).toBeFalsy();
})