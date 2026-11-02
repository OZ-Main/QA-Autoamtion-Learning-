import {expect, test} from './fixtures/test';

test('should open the fruit page using a fixture', async ({fruitsPage}) => {
    await expect(fruitsPage).toHaveURL(
        'https://demo.playwright.dev/api-mocking/'
    );
});
