import {expect, test} from "@playwright/test";

const invalidCredentials = [
    {
        username: 'invaliduser1',
        password: 'SuperSecretPassword!',
        expectedError: 'Your username is invalid!'
    },
    {
        username: 'tomsmith',
        password: 'wrongpassword',
        expectedError: 'Your password is invalid!'
    },
    {
        username: 'invaliduser2',
        password: 'wrongpassword',
        expectedError: 'Your username is invalid!'
    }
];

invalidCredentials.forEach(({username, password, expectedError}) => {
    test(`should reject login for ${username}`, async ({page}) => {
        await page.goto('/login');

        const usernameFiled = page.locator("#username");
        const passwordFiled = page.locator("#password");

        await usernameFiled.fill(username);
        await passwordFiled.fill(password);

        await page.getByRole('button', {name: 'Login'}).click();

        await expect(page).toHaveURL('/login');
        await expect(page.getByText(expectedError)).toContainText(expectedError);
    });
});