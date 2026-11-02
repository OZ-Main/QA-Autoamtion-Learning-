import {expect, test} from '@playwright/test';

test('should display an error when internal server error', async ({page}) => {
    await page.route('**/api/products', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({message: 'Internal server error'})
        });
    });

    await page.goto('http://example.com');

    await page.setContent(`
       <button id="load-products">Load Products</button>
        <p id="message"></p>

        <script>
          document.getElementById('load-products')
            .addEventListener('click', async () => {
              const response = await fetch('/api/products');
        
              if (!response.ok) {
                document.getElementById('message').textContent =
                  'Failed to load products';
              }
            });
        </script>
  `);

    await page.getByRole('button', {name: 'Load Products'}).click();
    await expect(page.getByText('Failed to load products')).toBeVisible();
});
