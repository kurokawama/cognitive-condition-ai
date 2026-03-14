// Auto-generated from flow-diagram.json — page: admin_reports
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 7 | Allowed roles: org_admin
import { test, expect } from '@playwright/test';

test.describe('組織レポート (/admin/reports)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 法人管理者
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/admin/reports');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: レポートをダウンロード — PDF/CSVレポート出力', async ({ page }) => {
    await page.goto('/admin/reports');
    const btn = page.getByRole('button', { name: /レポートをダウンロード/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: レポートファイル(PDF/CSV選択可)がダウンロードされる
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ダッシュボード — navigates to /admin/dashboard', async ({ page }) => {
    await page.goto('/admin/reports');
    const link = page.getByRole('link', { name: /ダッシュボード/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/admin/dashboard');
  });


  test('data: card — 組織週次レポート（チーム平均推移・参加率・部署別比較）', async ({ page }) => {
    await page.goto('/admin/reports');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — アラートサマリ（参加率低下チーム・平均スコア急変チームの通知）', async ({ page }) => {
    await page.goto('/admin/reports');
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
    await page.goto('/admin/reports');
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
    await page.goto('/admin/reports');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
