import {expect, test} from '@playwright/test';

test('should display an error when access is denied', async ({page}) => {
    await page.route('**/api/admin/users', async route => {
        await route.fulfill({
            status: 403,
            contentType: 'application/json',
            body: JSON.stringify({message: 'Forbidden'})
        });
    });

    await page.goto('http://example.com');

    await page.setContent(`
        <button id="load-users">Load Admin Users</button>
        <p id="message"></p>
        
        <script>
          document.getElementById('load-users').addEventListener('click', async () => {
            const response = await fetch('/api/admin/users');
    
            if (response.status === 403) {
              document.getElementById('message').textContent = 'Access denied';
            }
          });
        </script>
  `);

    await page.getByRole('button', {name: 'Load Admin Users'}).click();
    await expect(page.getByText('Access denied')).toBeVisible();
});
