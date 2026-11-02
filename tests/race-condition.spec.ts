import {expect, test} from '@playwright/test';

test('should display only the latest search results', async ({page}) => {
    let appleResponseFinished = false;

    await page.route('**/api/search**', async route => {
        const url = new URL(route.request().url());
        const query = url.searchParams.get('q');

        if (query === 'Apple') {
            await new Promise(resolve => setTimeout(resolve, 1500));
            appleResponseFinished = true;
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({results: [query]})
        });
    });

    await page.goto('http://example.com');

    await page.setContent(`
        <button id="apple">Search Apple</button>
        <button id="banana">Search Banana</button>
        <p id="results"></p>
    
        <script>
          let latestRequestId = 0;
    
          async function search(query) {
            const requestId = ++latestRequestId;
    
            const response = await fetch('/api/search?q=' + query);
            const data = await response.json();
    
            if (requestId === latestRequestId) {
              document.getElementById('results').textContent = data.results[0];
            }
          }
    
          document.getElementById('apple').onclick = () => search('Apple');
          document.getElementById('banana').onclick = () => search('Banana');
        </script>
  `);

    await page.getByRole('button', {name: 'Search Apple'}).click();
    await page.getByRole('button', {name: 'Search Banana'}).click();

    await expect(page.locator('#results')).toHaveText('Banana');

    await expect.poll(() => appleResponseFinished).toBe(true);

    await expect(page.locator('#results')).toHaveText('Banana');
});
