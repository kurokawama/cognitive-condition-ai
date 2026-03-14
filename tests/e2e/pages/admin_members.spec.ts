// Auto-generated from flow-diagram.json — page: admin_members
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 8 | Allowed roles: org_admin
import { test, expect } from '@playwright/test';

test.describe('メンバー管理 (/admin/members)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 法人管理者
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/admin/members');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: メンバー招待 — 招待メール送信', async ({ page }) => {
    await page.goto('/admin/members');
    const btn = page.getByRole('button', { name: /メンバー招待/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 招待メールが送信され、送信完了メッセージ表示
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: メンバー除外 — メンバーを組織から除外', async ({ page }) => {
    await page.goto('/admin/members');
    const btn = page.getByRole('button', { name: /メンバー除外/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 確認ダイアログ→除外実行→個人アカウントは維持される
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ダッシュボード — navigates to /admin/dashboard', async ({ page }) => {
    await page.goto('/admin/members');
    const link = page.getByRole('link', { name: /ダッシュボード/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/admin/dashboard');
  });

  test('form: メンバー招待フォーム — submits without error', async ({ page }) => {
    await page.goto('/admin/members');
    await page.fill('[name="email"]', 'test-value');
    await page.fill('[name="department"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('data: table — メンバー一覧（名前・部署・参加日・最終チェック日。個人スコアは非表示）', async ({ page }) => {
    await page.goto('/admin/members');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('unauthorized: 一般ユーザー（無料） cannot access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
    await page.goto('/admin/members');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });

  test('unauthorized: 一般ユーザー（有料） cannot access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
    await page.goto('/admin/members');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
