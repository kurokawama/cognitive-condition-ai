// Auto-generated from flow-diagram.json — page: terms
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Tests: 3 | Allowed roles: user, user_premium, org_admin
import { test, expect } from '@playwright/test';

test.describe('利用規約・免責事項 (/terms)', () => {
  test.beforeEach(async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');
  });

  test('page renders without error', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('404');
  });


  test('link: 戻る — navigates to history.back()', async ({ page }) => {
    await page.goto('/terms');
    const link = page.getByRole('link', { name: /戻る/ });
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL('history.back()');
  });


  test('data: card — 利用規約全文。4セクション構成: (1)利用規約、(2)プライバシーポリシー(#privacy)、(3)PMDA準拠免責事項（本アプリは医療機器ではなくコンディション表示ツールである旨を明記）、(4)特定商取引法に基づく表記(#commerce)。', async ({ page }) => {
    await page.goto('/terms');
    // Data display should render without error
    await expect(page.locator('body')).not.toContainText('500');
    await expect(page.locator('body')).not.toContainText('Error');
  });

});
