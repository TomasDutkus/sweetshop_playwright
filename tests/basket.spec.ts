import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('Basket Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/basket');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/basket');
    await verifyNavigationPanel(page);
  });

  test('Test Case 2: Basket Content', async ({ page }) => {
    await expect(page.locator('h1.display-3')).toHaveText('Your Basket');
    await expect(page.locator('#basketItems')).toBeVisible();
    await expect(page.locator('#basketItems a.small')).toHaveCount(0);

    // Add item to basket and verify
    await page.goto('https://sweetshop.netlify.app/sweets');
    await page.locator('.card').first().locator('a.btn-success').click();
    await page.goto('https://sweetshop.netlify.app/basket');
    await expect(page.locator('#basketItems a.small')).toHaveCount(1);

    // Remove item from basket and verify
    page.once('dialog', async (dialog) => {
      await dialog.accept(); // Clicks "Yes" or "OK"
    });
    await page.locator('#basketItems a.small').click();
    await expect(page.locator('#basketItems a.small')).toHaveCount(0);
  });

  test('Test Case 3: Checkout Button', async ({ page }) => {
    const checkoutButton = page.locator('button[type="submit"]');
    await expect(checkoutButton.nth(1)).toBeVisible();
    await expect(checkoutButton.nth(1)).toHaveText('Continue to checkout');
    await checkoutButton.nth(1).click();
  });

  test('Test Case 4: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
