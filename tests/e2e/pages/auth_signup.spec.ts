// Auto-generated from flow-diagram.json — page: auth_signup
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 5 | Allowed roles: user, user_premium, org_admin
import { test, expect } from '@playwright/test';

test.describe('新規登録 (/auth/signup)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/auth/signup');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 無料で登録 — アカウント作成', async ({ page }) => {
    await page.goto('/auth/signup');
    const btn = page.getByRole('button', { name: /無料で登録/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: アカウント作成成功→オンボーディング画面(/onboarding)に遷移。失敗→エラーメッセージ表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: すでにアカウントをお持ちの方 — navigates to /auth/login', async ({ page }) => {
    await page.goto('/auth/signup');
    const link = page.getByRole('link', { name: /すでにアカウントをお持ちの方/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/auth/login');
  });

  test('link: 利用規約 — navigates to /terms', async ({ page }) => {
    await page.goto('/auth/signup');
    const link = page.getByRole('link', { name: /利用規約/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms');
  });

  test('form: 新規登録フォーム — submits without error', async ({ page }) => {
    await page.goto('/auth/signup');
    await page.fill('[name="email"]', 'test-value');
    await page.fill('[name="password"]', 'test-value');
    await page.fill('[name="password_confirm"]', 'test-value');
    await page.fill('[name="nickname"]', 'test-value');
    await page.fill('[name="age_group"]', 'test-value');
    await page.fill('[name="terms_agree"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });


});
