// Auto-generated from flow-diagram.json — page: auth_forgot_password
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 4 | Allowed roles: user, user_premium, org_admin
import { test, expect } from '@playwright/test';

test.describe('パスワードリセット (/auth/forgot-password)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: リセットメールを送信 — パスワードリセットメール送信', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    const btn = page.getByRole('button', { name: /リセットメールを送信/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 成功→「メールを送信しました」表示。未登録メールでも同一メッセージ表示（情報漏洩防止）。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ログインに戻る — navigates to /auth/login', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    const link = page.getByRole('link', { name: /ログインに戻る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/login');
  });

  test('form: パスワードリセットフォーム — submits without error', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await page.fill('[name="email"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });


});
