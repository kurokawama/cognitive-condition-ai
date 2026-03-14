// Auto-generated from flow-diagram.json — page: auth_login
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 6 | Allowed roles: user, user_premium, org_admin
import { test, expect } from '@playwright/test';

test.describe('ログイン (/auth/login)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: ログイン — メール+パスワードでログイン', async ({ page }) => {
    await page.goto('/auth/login');
    const btn = page.getByRole('button', { name: /ログイン/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 認証成功→ホーム画面(/home)に遷移。失敗→エラーメッセージ表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: アカウントをお持ちでない方 — navigates to /auth/signup', async ({ page }) => {
    await page.goto('/auth/login');
    const link = page.getByRole('link', { name: /アカウントをお持ちでない方/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/signup');
  });

  test('link: パスワードを忘れた方 — navigates to /auth/forgot-password', async ({ page }) => {
    await page.goto('/auth/login');
    const link = page.getByRole('link', { name: /パスワードを忘れた方/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/forgot-password');
  });

  test('link: 利用規約 — navigates to /terms', async ({ page }) => {
    await page.goto('/auth/login');
    const link = page.getByRole('link', { name: /利用規約/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms');
  });

  test('form: ログインフォーム — submits without error', async ({ page }) => {
    await page.goto('/auth/login');
    await page.fill('[name="email"]', 'test-value');
    await page.fill('[name="password"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });


});
