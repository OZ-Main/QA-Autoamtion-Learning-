import {expect, test} from '@playwright/test';

test('should investigate a button blocked by an overlay', async ({page}) => {
    await page.setContent(`
    <button id="submit">Submit</button>

    <div
      id="overlay"
      style="
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 1000;
      "
    ></div>
  `);

    await page.locator('#overlay').evaluate(element => {
        setTimeout(() => element.remove(), 1000);
    });

    const submitButton = page.getByRole('button', {
        name: 'Submit'
    });

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();

    await expect(page.locator('#overlay')).toBeHidden();
    await submitButton.click({timeout: 3000});
});
