import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('Sweets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/sweets');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await verifyNavigationPanel(page);
  });

  test('Test Case 2: Product Cards', async ({ page }) => {
    const cards = page.locator('.card');
    await expect(cards).toHaveCount(16);
    for (let i = 0; i < (await cards.count()); i++) {
      const card = cards.nth(i);
      await expect(card.locator('img.card-img-top')).toBeVisible();
      await expect(card.locator('h4.card-title')).toBeVisible();
      await expect(card.locator('p.card-text')).toBeVisible();
      await expect(card.locator('p small.text-muted')).toBeVisible();
      const addToBasketButton = card.locator('a.btn-success');
      await expect(addToBasketButton).toBeVisible();
      await expect(addToBasketButton).toContainText('Add to Basket');
    }
  });

  test('Test Case 3: Add to Basket Button', async ({ page }) => {
    const cards = page.locator('.card');
    for (let i = 0; i < 4; i++) {
      await cards.nth(i).locator('a.btn-success').click();
      await expect(page.locator('.badge-success')).toContainText(
        (i + 1).toString()
      );
    }
  });

  test('Test Case 4: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
