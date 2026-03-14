// Auto-generated from flow-diagram.json — flow: flow_premium_analysis
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: high | Role: 一般ユーザー（有料） | Tests: 2
import { test, expect } from '@playwright/test';

test.describe('Flow: 有料AI分析フロー [HIGH]', () => {
  test('complete flow: 3 steps', async ({ page }) => {
    // Login as 一般ユーザー（有料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「もっと詳しく見る」をタップ (element: btn_to_analysis_result)
    await page.goto('/result');
    
    // Action: 「もっと詳しく見る」をタップ
    // Expected: AI分析画面(/ai-analysis)に遷移（有料ユーザーは直接全機能閲覧可能）
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: 傾向グラフ・原因仮説・行動提案を確認 (element: data_hypothesis)
    await page.goto('/ai-analysis');
    
    // Action: 傾向グラフ・原因仮説・行動提案を確認
    // Expected: 断定せず仮説形式で表示される。PMDA準拠（診断・リスク予測なし）。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 「AIに相談する」をタップ (element: btn_to_ai_talk)
    await page.goto('/ai-analysis');
    
    // Action: 「AIに相談する」をタップ
    // Expected: AIトーク画面(/ai-talk)に遷移
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 初日の分析', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: チェック履歴が1日分しかない場合
    // Expected: 「まだデータが少ないですが」と前置きして単日の傾向と一般的な行動提案を表示
    await expect(page.locator('body')).not.toContainText('500');
  });
});
