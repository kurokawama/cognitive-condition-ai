// Auto-generated from flow-diagram.json — page: ai_talk
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 10 | Allowed roles: user_premium
import { test, expect } from '@playwright/test';

test.describe('AIトーク (/ai-talk)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（有料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/ai-talk');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 送信 — AIにメッセージ送信', async ({ page }) => {
    await page.goto('/ai-talk');
    const btn = page.getByRole('button', { name: /送信/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: AIが応答を返す。1セッション最大3往復。3往復完了後は入力欄が非活性化。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 会話を終了 — AIトークセッション終了', async ({ page }) => {
    await page.goto('/ai-talk');
    const btn = page.getByRole('button', { name: /会話を終了/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/home');
  });

  test('link: ホーム — navigates to /home', async ({ page }) => {
    await page.goto('/ai-talk');
    const link = page.getByRole('link', { name: /ホーム/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/home');
  });

  test('form: チャット入力フォーム — submits without error', async ({ page }) => {
    await page.goto('/ai-talk');
    await page.fill('[name="message"]', 'test-value');
    await page.click('button[type="submit"]');
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('data: card — 会話ログ（ユーザー発言+AI応答の交互表示）', async ({ page }) => {
    await page.goto('/ai-talk');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 本日のテーマ（今日のチェック結果に基づく会話の起点）', async ({ page }) => {
    await page.goto('/ai-talk');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: kpi — 残り往復回数（3→2→1→0で会話終了）', async ({ page }) => {
    await page.goto('/ai-talk');
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
    await page.goto('/ai-talk');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });

  test('unauthorized: 法人管理者 cannot access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
    await page.goto('/ai-talk');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
