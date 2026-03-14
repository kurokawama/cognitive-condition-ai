// Auto-generated from flow-diagram.json — page: check
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 7 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('60秒チェック (/check)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/check');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: タップ（反応速度テスト用） — 画面に表示される刺激に対してタップ', async ({ page }) => {
    await page.goto('/check');
    const btn = page.getByRole('button', { name: /タップ（反応速度テスト用）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 反応時間が記録される（5-7試行、各試行の間隔はランダム1-3秒）
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 選択（短期記憶テスト用） — 表示された数字/図形の順序を再現', async ({ page }) => {
    await page.goto('/check');
    const btn = page.getByRole('button', { name: /選択（短期記憶テスト用）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 回答が記録される（3-5桁の数列を3セット）
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 応答（注意切替テスト用） — ルール切替に従って正しい応答を選択', async ({ page }) => {
    await page.goto('/check');
    const btn = page.getByRole('button', { name: /応答（注意切替テスト用）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 回答が記録される（30-45秒間、ルールが途中で切り替わる）
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });



  test('data: kpi — テスト進行状況（1/3, 2/3, 3/3）。タイマーは非表示（焦り防止）。', async ({ page }) => {
    await page.goto('/check');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 各テスト開始前の簡潔な説明（1文のみ）', async ({ page }) => {
    await page.goto('/check');
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
    await page.goto('/check');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
