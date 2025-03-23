import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('User Account Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/sweets');
    await page.locator('.card').first().locator('a.btn-success').click();
    await page.locator('.card').nth(1).locator('a.btn-success').click();
    await page.goto('https://sweetshop.netlify.app/login');
    await page.locator('input#exampleInputEmail').fill('test@user.com');
    await page.locator('input#exampleInputPassword').fill('qwerty');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('h1')).toContainText('Your Account');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await verifyNavigationPanel(page);
  });

  test('Test Case 2: User Greeting', async ({ page }) => {
    const userGreeting = page.locator('header .lead a');
    await expect(userGreeting).toBeVisible();
    await expect(userGreeting).toContainText('test@user.com');
  });

  test('Test Case 3: Previous Orders', async ({ page }) => {
    await expect(
      page.locator('h4.mb-3:has-text("Previous Orders")')
    ).toBeVisible();
    const transactions = page.locator('#transactions');
    await expect(transactions).toBeVisible();
    await expect(transactions.locator('thead th')).toHaveCount(4);
    await expect(
      (await transactions.locator('tbody tr').count()) > 0
    ).toBeTruthy();
    const rows = transactions.locator('tbody tr');
    for (let i = 0; i < (await rows.count()); i++) {
      const row = rows.nth(i);
      await expect(row.locator('th')).toBeVisible();
      await expect(row.locator('td')).toHaveCount(3);
    }
  });

  test('Test Case 4: Basket Summary', async ({ page }) => {
    await expect(
      page.locator('h4.d-flex:has-text("Your Basket")')
    ).toBeVisible();
    const basketItems = page.locator('#basketItems');
    await expect(basketItems).toBeVisible();
    await expect(basketItems.locator('a.small')).toHaveCount(2);
    page.once('dialog', async (dialog) => {
      await dialog.accept(); // Clicks "Yes" or "OK"
    });
    await basketItems.locator('a.small').first().click();
    await expect(basketItems.locator('a.small')).toHaveCount(1);
  });

  test('Test Case 5: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
