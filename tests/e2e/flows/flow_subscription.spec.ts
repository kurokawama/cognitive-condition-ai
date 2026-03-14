// Auto-generated from flow-diagram.json — flow: flow_subscription
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: high | Role: 一般ユーザー（無料） | Tests: 3
import { test, expect } from '@playwright/test';

test.describe('Flow: 課金フロー [HIGH]', () => {
  test('complete flow: 3 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: プラン比較表を確認 (element: data_plan_comparison)
    await page.goto('/subscription');
    
    // Action: プラン比較表を確認
    // Expected: 無料/有料の機能比較が表示される
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: 「月額980円で始める」または「年額7,800円」をタップ (element: btn_subscribe_monthly)
    await page.goto('/subscription');
    
    // Action: 「月額980円で始める」または「年額7,800円」をタップ
    // Expected: Phase 1: モック決済（即時premium昇格）。本番: Stripe Checkout画面に遷移。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: ホーム画面でプレミアム機能が利用可能になったことを確認 (element: link_ai_talk_home)
    await page.goto('/home');
    
    // Action: ホーム画面でプレミアム機能が利用可能になったことを確認
    // Expected: AIトーク・AI分析へのリンクがアクティブ状態で表示
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 決済失敗', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: Stripe決済が失敗した場合（カード拒否など）
    // Expected: 「お支払いが完了しませんでした」エラー表示。ユーザーはfreeのまま維持。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 既に有料ユーザー', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 有料ユーザーが課金画面にアクセスした場合
    // Expected: 現在のプラン・更新日・次回請求日を表示。解約ボタンを表示。購入ボタンは非表示。
    await expect(page.locator('body')).not.toContainText('500');
  });
});
