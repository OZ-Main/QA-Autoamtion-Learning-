import {expect, test} from "./fixtures/pages";

test("Verify successful login using LoadiungPage", async ({page, loginPage}) => {
    const username = "tomsmith";
    const password = "SuperSecretPassword!";

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL('/secure');
})

test("Verify failed login using LoadingPage invalid creds", async ({page, loginPage}) => {
    const username = "tomsmithsdaasd";
    const password = "wrongPassword123!";

    await loginPage.goto();
    await loginPage.login(username, password);

    await expect(page).toHaveURL('/login');
    await expect(loginPage.getErrorMessage()).toContainText(
        'Your username is invalid!'
    );
})