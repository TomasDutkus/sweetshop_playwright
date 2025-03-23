import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/login');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/login');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await verifyNavigationPanel(page);
  });

  test('Test Case 2: Login Form', async ({ page }) => {
    await expect(page.locator('form.needs-validation')).toBeVisible();
    await expect(page.locator('input#exampleInputEmail')).toBeVisible();
    await expect(page.locator('input#exampleInputPassword')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('Test Case 3: Email Validation', async ({ page }) => {
    await page.locator('input#exampleInputEmail').fill('invalid-email');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.invalid-email')).toBeVisible();
    await expect(page.locator('.invalid-email')).toContainText(
      'Please enter a valid email address'
    );
  });

  test('Test Case 4: Password Validation', async ({ page }) => {
    await page.locator('input#exampleInputPassword').fill('');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.invalid-password')).toBeVisible();
    await expect(page.locator('.invalid-password')).toContainText(
      'Please enter a valid password'
    );
  });

  test('Test Case 5: Form Submission', async ({ page }) => {
    await page.locator('input#exampleInputEmail').fill('test@user.com');
    await page.locator('input#exampleInputPassword').fill('qwerty');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('h1')).toContainText('Your Account');
  });

  test('Test Case 6: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
