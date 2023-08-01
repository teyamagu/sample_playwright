import { test, expect } from '@playwright/test';

test('ana login test', async ({ page }) => {
  const authFile = '.auth/auth.json';

  await page.goto('https://www.ana.co.jp/');
  await page.getByRole('link', { name: 'ログイン' }).click();
  await page.getByPlaceholder('例）1234567890').fill(process.env.ANA_USERNAME);
  await page.getByPlaceholder('例）Abc123456').fill(process.env.ANA_PASSWORD);
  await page.getByRole('link', { name: 'ログイン', exact: true }).click();
  await page.getByRole('link', { name: 'ログイン', exact: true }).click();
  await expect.soft(page.getByRole('link', { name: 'ログアウト' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});

test('ana login view test', async ({ page }) => {
  await page.goto('https://www.ana.co.jp/');
  await expect.soft(page.getByRole('link', { name: 'ログイン' })).toBeVisible();
});

test.describe(() => {
  test.use({ storageState: '.auth/auth.json' });

  test('ana already login test', async ({ page }) => {
    await page.goto('https://www.ana.co.jp/');
    await expect.soft(page.getByRole('link', { name: 'ログアウト' })).toBeVisible();
  });
});