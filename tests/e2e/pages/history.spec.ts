// Auto-generated from flow-diagram.json — page: history
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 9 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('推移グラフ (/history)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/history');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 7日 — 7日間表示に切替', async ({ page }) => {
    await page.goto('/history');
    const btn = page.getByRole('button', { name: /7日/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 7日間のスコア推移が表示される（無料/有料共通）
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 30日 — 30日間表示に切替', async ({ page }) => {
    await page.goto('/history');
    const btn = page.getByRole('button', { name: /30日/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 有料→30日間表示。無料→「プレミアムで30日まで確認できます」バナー表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 90日 — 90日間表示に切替', async ({ page }) => {
    await page.goto('/history');
    const btn = page.getByRole('button', { name: /90日/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 有料→90日間表示。無料→「プレミアムで90日まで確認できます」バナー表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ホーム — navigates to /home', async ({ page }) => {
    await page.goto('/history');
    const link = page.getByRole('link', { name: /ホーム/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/home');
  });

  test('link: プレミアムで90日まで見る — navigates to /subscription', async ({ page }) => {
    await page.goto('/history');
    const link = page.getByRole('link', { name: /プレミアムで90日まで見る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/subscription');
  });


  test('data: chart — スコア推移折れ線グラフ（総合+3サブスコア切替可）', async ({ page }) => {
    await page.goto('/history');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: table — ひとこと記録タイムライン（スコアグラフと連動表示）', async ({ page }) => {
    await page.goto('/history');
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
    await page.goto('/history');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
