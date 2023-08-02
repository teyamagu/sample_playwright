import { test, expect } from '@playwright/test';
import { AnaIndex } from '@pages/ana/index';

test.describe.configure({ mode: 'serial' });

test('ana login test and create authenticated status file', async ({ page }) => {
  const authFile = '.auth/auth.json';
  const anaIndex = new AnaIndex(page);

  await anaIndex.login(process.env.ANA_USERNAME, process.env.ANA_PASSWORD);
  await expect.soft(page.getByRole('link', { name: 'ログアウト' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});

test('ana top view test before login', async ({ page }) => {
  const anaIndex = new AnaIndex(page);

  await anaIndex.load();
  await expect.soft(page.getByRole('link', { name: 'ログイン' })).toBeVisible();
});

test.describe(() => {
  test.use({ storageState: '.auth/auth.json' });

  test('ana top view test after authenticated', async ({ page }) => {
    const anaIndex = new AnaIndex(page);

    await anaIndex.load();
    await expect.soft(page.getByRole('link', { name: 'ログアウト' })).toBeVisible();
  });
});