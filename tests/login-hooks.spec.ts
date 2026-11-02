import {test, expect} from "@playwright/test"

test.beforeEach(async ({page}) => {
    const loginURL = `/login`;
    await page.goto(loginURL);
})

test("should display the login form", async ({page}) => {
    const usernameField = page.locator("#username");
    const passwordField = page.locator("#password");

    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();
})

test("should display the login button", async ({page}) => {
    const loginButton = page.getByRole("button", {name: "Login"});
    await expect(loginButton).toBeVisible();
})