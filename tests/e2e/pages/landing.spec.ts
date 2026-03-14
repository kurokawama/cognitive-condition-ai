// Auto-generated from flow-diagram.json — page: landing
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 8 | Allowed roles: user, user_premium, org_admin
import { test, expect } from '@playwright/test';

test.describe('ランディングページ (/)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 無料で始める — 新規登録画面に遷移', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByRole('button', { name: /無料で始める/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/auth/signup');
  });

  test('button: ログイン — ログイン画面に遷移', async ({ page }) => {
    await page.goto('/');
    const btn = page.getByRole('button', { name: /ログイン/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/auth/login');
  });

  test('link: 利用規約 — navigates to /terms', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /利用規約/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms');
  });

  test('link: プライバシーポリシー — navigates to /terms#privacy', async ({ page }) => {
    await page.goto('/');
    const link = page.getByRole('link', { name: /プライバシーポリシー/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms#privacy');
  });


  test('data: card — ヒーローセクション: キャッチコピー「頭の体重計」+ サービス説明 + PMDA免責表示', async ({ page }) => {
    await page.goto('/');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 機能紹介: 60秒チェック・AIコーチング・推移グラフの3つ', async ({ page }) => {
    await page.goto('/');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 無料/有料プランの概要比較', async ({ page }) => {
    await page.goto('/');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

});
