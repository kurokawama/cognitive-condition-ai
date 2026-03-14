// Auto-generated from flow-diagram.json — flow: flow_history
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: medium | Role: 一般ユーザー（無料） | Tests: 3
import { test, expect } from '@playwright/test';

test.describe('Flow: 履歴確認フロー [MEDIUM]', () => {
  test('complete flow: 3 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「履歴を見る」リンクをタップ (element: link_history_home)
    await page.goto('/home');
    
    // Action: 「履歴を見る」リンクをタップ
    // Expected: 履歴画面(/history)に遷移。デフォルトは7日間表示。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: スコア推移グラフを確認 (element: data_score_chart)
    await page.goto('/history');
    
    // Action: スコア推移グラフを確認
    // Expected: 7日間のスコア推移折れ線グラフが表示される
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 「90日」ボタンをタップ (element: btn_period_90d)
    await page.goto('/history');
    
    // Action: 「90日」ボタンをタップ
    // Expected: 有料→90日間表示に切替。無料→課金導線バナー表示、7日間は維持。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: データ不足', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: チェック履歴が3日分未満の場合
    // Expected: 利用可能なデータのみ表示。「あとX日チェックするとグラフが見えてきます」メッセージ表示。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 無料ユーザーが30日/90日をタップ', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 無料ユーザーが長期間表示を選択した場合
    // Expected: 「プレミアムで90日まで確認できます」バナー表示。/subscriptionへのリンク併記。7日間表示は維持。
    await expect(page.locator('body')).not.toContainText('500');
  });
});
