// Auto-generated from flow-diagram.json — page: ai_analysis
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 10 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('AI分析結果表示 (/ai-analysis)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/ai-analysis');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: プレミアムで毎日分析を見る — 課金画面に遷移', async ({ page }) => {
    await page.goto('/ai-analysis');
    const btn = page.getByRole('button', { name: /プレミアムで毎日分析を見る/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/subscription');
  });

  test('button: 1回無料で体験する — D7無料体験を実行', async ({ page }) => {
    await page.goto('/ai-analysis');
    const btn = page.getByRole('button', { name: /1回無料で体験する/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: free_trial_used=trueに更新し、AI分析結果を全表示。条件: streak_days>=7 かつ free_trial_used=false。条件未達の場合はボタン非表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: AIに相談する — AIトーク画面に遷移', async ({ page }) => {
    await page.goto('/ai-analysis');
    const btn = page.getByRole('button', { name: /AIに相談する/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/ai-talk');
  });

  test('link: ホーム — navigates to /home', async ({ page }) => {
    await page.goto('/ai-analysis');
    const link = page.getByRole('link', { name: /ホーム/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/home');
  });


  test('data: chart — 直近のスコア傾向グラフ', async ({ page }) => {
    await page.goto('/ai-analysis');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 原因仮説（断定せず仮説形式。PMDA準拠: 診断・リスク予測禁止）', async ({ page }) => {
    await page.goto('/ai-analysis');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — おすすめ行動（1-3個の具体的な行動提案）', async ({ page }) => {
    await page.goto('/ai-analysis');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 無料ユーザー向けぼかしプレビュー（有料ユーザーには非表示）', async ({ page }) => {
    await page.goto('/ai-analysis');
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
    await page.goto('/ai-analysis');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
