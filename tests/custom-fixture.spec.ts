import {expect, test} from './fixtures/test';

test('should use a custom fixture', async ({page, fruitsUrl}) => {
    await page.goto(fruitsUrl);

    await expect(page).toHaveURL(fruitsUrl);
});
