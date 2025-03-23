import { test, expect } from '@playwright/test';
import { verifyNavigationPanel, verifyFooter } from './utils/utils';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://sweetshop.netlify.app/about');
    await expect(page).toHaveURL('https://sweetshop.netlify.app/about');
  });

  test('Test Case 1: Navigation Bar', async ({ page }) => {
    await verifyNavigationPanel(page);
  });

  test('Test Case 2: Page Content', async ({ page }) => {
    await expect(page.locator('h1.display-3')).toHaveText('Sweet Shop Project');
    const paragraphs = page.locator('p.lead');
    await expect(paragraphs.nth(0)).toContainText(
      'An intentionally broken web application to help demonstrate Chrome DevTools.'
    );
    await expect(paragraphs.nth(1)).toContainText(
      'Sweet Shop is a project created to help demonstrate some of the great features of the Chrome DevTools which may be of use to people who help test web applications. Sweet Shop encompasses common issues found in real-world web applications!'
    );
  });

  test('Test Case 3: Footer', async ({ page }) => {
    await verifyFooter(page);
  });
});
