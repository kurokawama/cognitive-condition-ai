// Auto-generated from flow-diagram.json — page: home
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 13 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('ホーム (/home)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/home');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 今日のチェックを始める — 認知チェック画面に遷移', async ({ page }) => {
    await page.goto('/home');
    const btn = page.getByRole('button', { name: /今日のチェックを始める/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/check');
  });

  test('button: ひとこと記録 — ノート記録画面に遷移', async ({ page }) => {
    await page.goto('/home');
    const btn = page.getByRole('button', { name: /ひとこと記録/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/note');
  });

  test('link: 履歴を見る — navigates to /history', async ({ page }) => {
    await page.goto('/home');
    const link = page.getByRole('link', { name: /履歴を見る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/history');
  });

  test('link: AIトーク — navigates to /ai-talk', async ({ page }) => {
    await page.goto('/home');
    const link = page.getByRole('link', { name: /AIトーク/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/ai-talk');
  });

  test('link: AI分析 — navigates to /ai-analysis', async ({ page }) => {
    await page.goto('/home');
    const link = page.getByRole('link', { name: /AI分析/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/ai-analysis');
  });

  test('link: 設定 — navigates to /settings', async ({ page }) => {
    await page.goto('/home');
    const link = page.getByRole('link', { name: /設定/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/settings');
  });


  test('data: kpi — 今日の総合スコア（100点満点）。未チェックなら「今日のチェックをしましょう」表示。', async ({ page }) => {
    await page.goto('/home');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: kpi — 連続チェック日数', async ({ page }) => {
    await page.goto('/home');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: kpi — 自己ベストスコア', async ({ page }) => {
    await page.goto('/home');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 最新のAIひとことコメント（前回チェック結果に基づく）', async ({ page }) => {
    await page.goto('/home');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — D7無料体験バナー（streak_days>=7 かつ free_trial_used=false の無料ユーザーのみ表示）', async ({ page }) => {
    await page.goto('/home');
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
    await page.goto('/home');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
