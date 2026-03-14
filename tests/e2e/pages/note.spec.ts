// Auto-generated from flow-diagram.json — page: note
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 6 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('ひとこと記録 (/note)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/note');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 記録する — ひとこと記録を保存', async ({ page }) => {
    await page.goto('/note');
    const btn = page.getByRole('button', { name: /記録する/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 記録が保存され、保存完了メッセージ表示後、遷移元に戻る
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: 戻る — navigates to history.back()', async ({ page }) => {
    await page.goto('/note');
    const link = page.getByRole('link', { name: /戻る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('history.back()');
  });

  test('form: ひとこと記録フォーム — submits without error', async ({ page }) => {
    await page.goto('/note');
    await page.fill('[name="sleep_quality"]', 'test-value');
    await page.fill('[name="mood"]', 'test-value');
    await page.fill('[name="busyness"]', 'test-value');
    await page.fill('[name="free_text"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('data: card — 今日のチェック結果サマリ（記録の参考用に表示）', async ({ page }) => {
    await page.goto('/note');
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
    await page.goto('/note');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
