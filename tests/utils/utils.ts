import { Page, expect } from '@playwright/test';

export async function verifyNavigationPanel(page: Page) {
  await expect(page.locator('nav')).toBeVisible();
  await expect(page.locator('nav:has-text("Sweet Shop")')).toBeVisible();
  await expect(page.locator('nav:has-text("Sweets")')).toBeVisible();
  await expect(page.locator('nav:has-text("About")')).toBeVisible();
  await expect(page.locator('nav:has-text("Login")')).toBeVisible();
  await expect(page.locator('nav:has-text("Basket")')).toBeVisible();
}

export async function verifyFooter(page: Page) {
  await expect(page.locator('footer')).toBeVisible();
  await expect(page.locator('footer p')).toContainText(
    'Sweet Shop Project 2018'
  );
}
