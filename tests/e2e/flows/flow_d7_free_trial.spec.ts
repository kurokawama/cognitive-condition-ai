// Auto-generated from flow-diagram.json — flow: flow_d7_free_trial
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: critical | Role: 一般ユーザー（無料） | Tests: 4
import { test, expect } from '@playwright/test';

test.describe('Flow: D7 AI分析無料体験フロー [CRITICAL]', () => {
  test('complete flow: 4 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 結果画面で「もっと詳しく見る」をタップ (element: btn_to_analysis_result)
    await page.goto('/result');
    // Precondition: streak_days >= 7 かつ free_trial_used = false
    // Action: 結果画面で「もっと詳しく見る」をタップ
    // Expected: AI分析画面(/ai-analysis)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: 「1回無料で体験する」ボタンをタップ (element: btn_d7_free_trial)
    await page.goto('/ai-analysis');
    
    // Action: 「1回無料で体験する」ボタンをタップ
    // Expected: free_trial_used=trueに更新。AI分析結果（傾向・仮説・行動提案）が全表示される。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 分析結果を確認した後、「プレミアムで毎日分析を見る」をタップ (element: btn_upgrade_analysis)
    await page.goto('/ai-analysis');
    
    // Action: 分析結果を確認した後、「プレミアムで毎日分析を見る」をタップ
    // Expected: 課金画面(/subscription)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 4: プラン比較を確認 (element: data_plan_comparison)
    await page.goto('/subscription');
    
    // Action: プラン比較を確認
    // Expected: 無料/有料の機能比較表が表示される
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: D7未達でアクセス', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: streak_days < 7 の無料ユーザーがAI分析にアクセスした場合
    // Expected: ぼかしプレビューのみ表示。「あとX日チェックを続けると1回無料で体験できます」メッセージ表示。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 無料体験使用済み', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: free_trial_used = true の無料ユーザーがAI分析にアクセスした場合
    // Expected: ぼかしプレビュー表示。「プレミアムで毎日分析を見る」ボタンのみ表示。D7ボタンは非表示。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: streak途切れ後の復帰', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: streakが一度7以上に達したが途切れた場合
    // Expected: free_trial_usedがfalseなら、再度streak>=7達成時にD7ボタンが表示される
    await expect(page.locator('body')).not.toContainText('500');
  });
});
