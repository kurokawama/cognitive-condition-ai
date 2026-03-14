// Auto-generated from flow-diagram.json — page: settings
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 12 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('設定 (/settings)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/settings');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 保存 — プロフィール保存', async ({ page }) => {
    await page.goto('/settings');
    const btn = page.getByRole('button', { name: /保存/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: プロフィールが更新され、保存完了メッセージ表示
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 通知設定を保存 — 通知設定保存', async ({ page }) => {
    await page.goto('/settings');
    const btn = page.getByRole('button', { name: /通知設定を保存/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 通知設定が保存される
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: ログアウト — ログアウト実行', async ({ page }) => {
    await page.goto('/settings');
    const btn = page.getByRole('button', { name: /ログアウト/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: セッション破棄→ランディングページ(/)に遷移
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: アカウント削除 — アカウント削除確認ダイアログ表示', async ({ page }) => {
    await page.goto('/settings');
    const btn = page.getByRole('button', { name: /アカウント削除/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 確認ダイアログ「全てのデータが削除されます。この操作は取り消せません。」→確認→全データ削除→ランディングページ(/)に遷移
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ホーム — navigates to /home', async ({ page }) => {
    await page.goto('/settings');
    const link = page.getByRole('link', { name: /ホーム/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/home');
  });

  test('link: プラン管理 — navigates to /subscription', async ({ page }) => {
    await page.goto('/settings');
    const link = page.getByRole('link', { name: /プラン管理/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/subscription');
  });

  test('link: 利用規約 — navigates to /terms', async ({ page }) => {
    await page.goto('/settings');
    const link = page.getByRole('link', { name: /利用規約/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms');
  });

  test('form: プロフィール編集フォーム — submits without error', async ({ page }) => {
    await page.goto('/settings');
    await page.fill('[name="nickname"]', 'test-value');
    await page.fill('[name="age_group"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('form: 通知設定フォーム — submits without error', async ({ page }) => {
    await page.goto('/settings');
    await page.fill('[name="notification_enabled"]', 'test-value');
    await page.fill('[name="notification_time"]', 'test-value');
    await page.fill('[name="notification_frequency"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('data: card — アカウント情報（メールアドレス・登録日・現在のプラン）', async ({ page }) => {
    await page.goto('/settings');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('unauthorized: 法人管理者 cannot access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
    await page.goto('/settings');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
