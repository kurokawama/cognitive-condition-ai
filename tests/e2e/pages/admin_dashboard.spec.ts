// Auto-generated from flow-diagram.json — page: admin_dashboard
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 8 | Allowed roles: org_admin
import { test, expect } from '@playwright/test';

test.describe('法人ダッシュボード (/admin/dashboard)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 法人管理者
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/admin/dashboard');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });


  test('link: メンバー管理 — navigates to /admin/members', async ({ page }) => {
    await page.goto('/admin/dashboard');
    const link = page.getByRole('link', { name: /メンバー管理/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/admin/members');
  });

  test('link: レポート — navigates to /admin/reports', async ({ page }) => {
    await page.goto('/admin/dashboard');
    const link = page.getByRole('link', { name: /レポート/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/admin/reports');
  });


  test('data: kpi — チーム平均スコア（個人スコアは非表示、プライバシー保護）', async ({ page }) => {
    await page.goto('/admin/dashboard');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: chart — チーム平均の推移グラフ（30日/90日）', async ({ page }) => {
    await page.goto('/admin/dashboard');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: kpi — チェック参加率（今週/先週比較）', async ({ page }) => {
    await page.goto('/admin/dashboard');
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
    await page.goto('/admin/dashboard');
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
    await page.goto('/admin/dashboard');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
