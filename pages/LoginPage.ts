import {type Page} from '@playwright/test';

export class LoginPage {
    constructor(private readonly page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/login');
    }

    async login(username: string, password: string) {
        await this.page.locator('#username').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }

    getErrorMessage() {
        return this.page.locator("#flash");
    }
}
