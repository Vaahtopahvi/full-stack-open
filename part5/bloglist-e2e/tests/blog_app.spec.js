import { test, expect } from '@playwright/test';

test.describe('Blog App', () => {
  test.beforeEach(async ({ page, request }) => {
    // await request.post('http://localhost:3003/api/users');
    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      // await page.getByRole('button', { name: 'login' }).click();
      await page.getByLabel('username').fill('mluukkai');
      await page.getByLabel('password').fill('salainen');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('logged in')).toBeVisible();
      // await page.getByRole('button', { name: 'logout' }).click();
    });
    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('mluukkai');
      await page.getByLabel('password').fill('wronk');
      await page.getByRole('button', { name: 'login' }).click();
      await expect(page.getByText('wrong username or password')).toBeVisible();
    });
  });
});
