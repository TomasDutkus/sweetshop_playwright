import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await verifyNavigationPanel(page);
    // Verify navigation links
    await page.locator('nav').getByText('Sweet Shop').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/');

    await page.locator('nav').getByText('Sweets').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');

    await page.locator('nav').getByText('About').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/about');

    await page.locator('nav').getByText('Login').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/login');

    await page.locator('nav').getByText('Basket').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/basket');
  });

  test('Test Case 2: Hero Section', async ({ page }) => {
    await expect(page.locator('.advertising img')).toBeVisible();
    await expect(page.locator('.advertising img')).toHaveAttribute(
      'alt',
      'Sale now on'
    );
    await expect(page.locator('h1.display-3')).toContainText(
      'Welcome to the sweet shop!'
    );
    await expect(page.locator('.my-4 p.lead')).toContainText(
      'The sweetest online shop out there.'
    );
    await expect(page.locator('a.btn-primary')).toBeVisible();
    await expect(page.locator('a.btn-primary')).toHaveAttribute(
      'href',
      '/sweets'
    );
    await expect(page.locator('a.btn-primary')).toContainText('Browse Sweets');
    await page.locator('a.btn-primary').click();
    await expect(page).toHaveURL('https://sweetshop.netlify.app/sweets');
  });

  test('Test Case 3: Product Cards', async ({ page }) => {
    await expect(page.locator('.cards')).toHaveCount(4);
    const cards = page.locator('.cards');
    for (let i = 0; i < (await cards.count()); i++) {
      const card = cards.nth(i);
      await expect(card.locator('img.card-img-top')).toBeVisible();
      await expect(card.locator('h4.card-title')).toBeVisible();
      await expect(card.locator('p.card-text')).toBeVisible();
      await expect(card.locator('p small.text-muted')).toBeVisible();
      await expect(card.locator('a.btn-success')).toBeVisible();
      await expect(card.locator('a.btn-success')).toContainText(
        'Add to Basket'
      );
    }
  });

  test('Test Case 4: Add to Basket Button', async ({ page }) => {
    const cards = page.locator('.cards');
    for (let i = 0; i < (await cards.count()); i++) {
      await cards.nth(i).locator('a.btn-success').click();
      await expect(page.locator('.badge-success')).toContainText(
        (i + 1).toString()
      );
    }
  });

  test('Test Case 5: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
