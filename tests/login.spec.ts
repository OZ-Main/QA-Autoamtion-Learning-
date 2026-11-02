import {expect, test} from "@playwright/test"


test("should log in successfully with valid credentials", async ({page}) => {
    const secureUrl = `/secure`

    await test.step("Navigate to login page", async () => {
        const loginURL = `/login`;
        await page.goto(loginURL);
    })

    await test.step("Submit valid login credentials", async () => {
        const username = "tomsmith";
        const password = "SuperSecretPassword!";

        const usernameField = page.getByRole("textbox", {name: "username"});
        const passwordField = page.getByRole("textbox", {name: "password"});
        const loginButton = page.getByRole("button", {name: "Login"});

        await usernameField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();
    })

    await test.step("Check successful login", async () => {
        await expect(page).toHaveURL(secureUrl);
        await expect(page.getByText("You logged into a secure area!")).toBeVisible();
    })
})

test("should prevent login with invalid credentials", async ({page}) => {
    const loginURL = '/login';

    await test.step("Navigate to login page", async () => {
        await page.goto(loginURL);
    })

    const flashNotification = page.locator("#flash");

    await test.step("Submit invalid login credentials", async () => {
        const username = "tomsmith";
        const password = "wrongPassword123!";

        const usernameField = page.getByRole("textbox", {name: "username"});
        const passwordField = page.getByRole("textbox", {name: "password"});
        const loginButton = page.getByRole("button", {name: "Login"});

        await usernameField.fill(username);
        await passwordField.fill(password);
        await loginButton.click();
    })

    await test.step("Check unsuccessful login", async () => {
        await expect(page).toHaveURL(loginURL);
        await expect(flashNotification).toContainText("Your password is invalid!");
    })
})

test("should redirect unauthenticated users to login", async ({page}) => {
    await test.step("Navigate to secure page", async () => {
        const secureUrl = '/secure';
        await page.goto(secureUrl);
    })

    await test.step("Check blocked secure navigation for unauthenticated users", async () => {
        const loginURL = '/login';
        const flashNotification = page.locator("#flash");

        await expect(page).toHaveURL(loginURL);
        await expect(flashNotification).toContainText("You must login to view the secure area!");
    })
})

// Find an element by its ID
// page.locator('#username')

// Fill an input
// await locator.fill('some value');

// Click an element
// await locator.click();

// Verify the URL
// await expect(page).toHaveURL(/\/secure/);

// Verify visible text
// await expect(page.getByText('Some text')).toBeVisible();