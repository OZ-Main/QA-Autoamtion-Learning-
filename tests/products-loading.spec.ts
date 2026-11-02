import {expect, test} from '@playwright/test';

test('should display a loader and porducts after', async ({page}) => {
    await page.route('**/api/products', async route => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify([])
        });
    });

    await page.goto('http://example.com');

    await page.setContent(`
       <button id="load-products">Load Products</button>
        <p id="status"></p>

        <script>
          document.getElementById('load-products')
            .addEventListener('click', async () => {
              const status = document.getElementById('status');
        
              status.textContent = 'Loading products...';
        
              const response = await fetch('/api/products');
        
              if (response.ok) {
                status.textContent = 'Products loaded';
              }
            });
        </script>
  `);

    await page.getByRole('button', {name: 'Load Products'}).click();

    await expect(page.getByText('Loading products...')).toBeVisible();
    await expect(page.getByText('Products loaded')).toBeVisible();
    await expect(page.getByText('Loading products...')).not.toBeVisible();
});
