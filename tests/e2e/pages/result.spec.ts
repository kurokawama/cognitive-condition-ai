// Auto-generated from flow-diagram.json — page: result
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 10 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('スコア結果表示 (/result)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/result');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: ひとこと記録する — ノート記録画面に遷移', async ({ page }) => {
    await page.goto('/result');
    const btn = page.getByRole('button', { name: /ひとこと記録する/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/note');
  });

  test('button: もっと詳しく見る — AI分析画面に遷移', async ({ page }) => {
    await page.goto('/result');
    const btn = page.getByRole('button', { name: /もっと詳しく見る/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/ai-analysis');
  });

  test('button: ホームに戻る — ホーム画面に遷移', async ({ page }) => {
    await page.goto('/result');
    const btn = page.getByRole('button', { name: /ホームに戻る/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/home');
  });

  test('link: 履歴を見る — navigates to /history', async ({ page }) => {
    await page.goto('/result');
    const link = page.getByRole('link', { name: /履歴を見る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/history');
  });


  test('data: kpi — 総合スコア（100点満点）。完了時に必ず「できました」の肯定フィードバック表示。', async ({ page }) => {
    await page.goto('/result');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: chart — 3サブスコア: 反応速度・短期記憶・注意切替（レーダーチャート）', async ({ page }) => {
    await page.goto('/result');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — 前日比表示。スコア下降時は中立色（グレー系#9CA3AF）、赤色・下矢印禁止。', async ({ page }) => {
    await page.goto('/result');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: card — AIひとこと（仮説・提案形式、断言禁止）。自己ベスト更新時は祝福メッセージ。', async ({ page }) => {
    await page.goto('/result');
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
    await page.goto('/result');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
