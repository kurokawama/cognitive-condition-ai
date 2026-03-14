// Auto-generated from flow-diagram.json — page: onboarding
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 8 | Allowed roles: user
import { test, expect } from '@playwright/test';

test.describe('初回オンボーディング (/onboarding)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/onboarding');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });

  test('button: 次へ（1/3） — Step 1: 60秒チェックの説明確認', async ({ page }) => {
    await page.goto('/onboarding');
    const btn = page.getByRole('button', { name: /次へ（1\/3）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: Step 2に進む
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: 次へ（2/3） — Step 2: AIコーチングの説明確認', async ({ page }) => {
    await page.goto('/onboarding');
    const btn = page.getByRole('button', { name: /次へ（2\/3）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    // Expected: Step 3に進む
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('button: さっそく始める（3/3） — Step 3: オンボーディング完了、ホームに遷移', async ({ page }) => {
    await page.goto('/onboarding');
    const btn = page.getByRole('button', { name: /さっそく始める（3\/3）/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/home');
  });

  test('button: スキップ — オンボーディングをスキップしてホームに遷移', async ({ page }) => {
    await page.goto('/onboarding');
    const btn = page.getByRole('button', { name: /スキップ/ });
    await expect(btn).toBeVisible();
    await btn.click();
    await expect(page).toHaveURL('/home');
  });



  test('data: kpi — 進行インジケーター（1/3, 2/3, 3/3のドット表示）', async ({ page }) => {
    await page.goto('/onboarding');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

  test('unauthorized: 一般ユーザー（有料） cannot access', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
    await page.goto('/onboarding');
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
    await page.goto('/onboarding');
    // Should redirect to login or show unauthorized
    const url = page.url();
    const hasAccess = !url.includes('login') && !url.includes('unauthorized') && !url.includes('403');
    expect(hasAccess).toBe(false);
    await context.close();
  });
});
