// Auto-generated from flow-diagram.json — page: subscription
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 9 | Allowed roles: user, user_premium
import { test, expect } from '@playwright/test';

test.describe('課金画面 (/subscription)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/subscription');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 月額980円で始める — 月額サブスクリプション開始', async ({ page }) => {
    await page.goto('/subscription');
    const btn = page.getByRole('button', { name: /月額980円で始める/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: Phase 1: モック決済（即時premium昇格→ホームに遷移）。本番: Stripe Checkout画面に遷移。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 年額7,800円（2ヶ月分お得） — 年額サブスクリプション開始', async ({ page }) => {
    await page.goto('/subscription');
    const btn = page.getByRole('button', { name: /年額7,800円（2ヶ月分お得）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: Phase 1: モック決済（即時premium昇格→ホームに遷移）。本番: Stripe Checkout画面に遷移。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: プランを解約する — サブスクリプション解約', async ({ page }) => {
    await page.goto('/subscription');
    const btn = page.getByRole('button', { name: /プランを解約する/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: 解約確認ダイアログ→確認→期間終了時にfreeに降格（即時解約ではない）。有料ユーザーのみ表示。
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('link: ホーム — navigates to /home', async ({ page }) => {
    await page.goto('/subscription');
    const link = page.getByRole('link', { name: /ホーム/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/home');
  });

  test('link: 特定商取引法に基づく表記 — navigates to /terms#commerce', async ({ page }) => {
    await page.goto('/subscription');
    const link = page.getByRole('link', { name: /特定商取引法に基づく表記/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('/terms#commerce');
  });


  test('data: card — 無料/有料プラン機能比較表（チェックマーク形式）', async ({ page }) => {
    await page.goto('/subscription');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('data: kpi — 現在のプラン表示（有料ユーザーは更新日・次回請求日を表示）', async ({ page }) => {
    await page.goto('/subscription');
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
    await page.goto('/subscription');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
