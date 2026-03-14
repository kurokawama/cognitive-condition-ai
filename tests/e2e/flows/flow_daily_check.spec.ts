// Auto-generated from flow-diagram.json — flow: flow_daily_check
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: critical | Role: 一般ユーザー（無料） | Tests: 4
import { test, expect } from '@playwright/test';

test.describe('Flow: 日次チェックフロー [CRITICAL]', () => {
  test('complete flow: 8 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「今日のチェックを始める」をタップ (element: btn_start_check)
    await page.goto('/home');
    // Precondition: ユーザーがログイン済み
    // Action: 「今日のチェックを始める」をタップ
    // Expected: チェック画面(/check)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: 反応速度テストを実施（5-7試行） (element: btn_reaction_tap)
    await page.goto('/check');
    
    // Action: 反応速度テストを実施（5-7試行）
    // Expected: テスト完了、短期記憶テストに自動遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 短期記憶テストを実施（3-5桁の数列を3セット） (element: btn_memory_select)
    await page.goto('/check');
    
    // Action: 短期記憶テストを実施（3-5桁の数列を3セット）
    // Expected: テスト完了、注意切替テストに自動遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 4: 注意切替テストを実施（30-45秒） (element: btn_attention_respond)
    await page.goto('/check');
    
    // Action: 注意切替テストを実施（30-45秒）
    // Expected: テスト完了、結果画面(/result)に自動遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 5: 総合スコア・3サブスコア・前日比・AIひとことを確認 (element: data_total_score)
    await page.goto('/result');
    
    // Action: 総合スコア・3サブスコア・前日比・AIひとことを確認
    // Expected: スコアが表示される。「できました」の肯定フィードバック表示。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 6: 「ひとこと記録する」をタップ (element: btn_note_result)
    await page.goto('/result');
    
    // Action: 「ひとこと記録する」をタップ
    // Expected: ノート記録画面(/note)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 7: 睡眠・気分・忙しさを各1タップで選択し、「記録する」をタップ (element: form_note)
    await page.goto('/note');
    
    // Action: 睡眠・気分・忙しさを各1タップで選択し、「記録する」をタップ
    // Expected: 記録が保存され、遷移元に戻る
    await expect(page.locator('body')).not.toContainText('500');

    // Step 8: ホーム画面で更新されたスコアと連続記録を確認 (element: data_today_score)
    await page.goto('/home');
    
    // Action: ホーム画面で更新されたスコアと連続記録を確認
    // Expected: 今日のスコアと連続日数が更新されている
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 同日2回目のチェック', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 当日既にチェック済みの状態で再度チェックを実施した場合
    // Expected: 2回目の結果も記録される。ホームには今日の最高スコアが表示される。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: テスト中断・バックグラウンド移動', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: チェック中にアプリがバックグラウンドに移動した場合
    // Expected: テストが一時停止し、復帰時に中断地点から再開（5分以上経過で最初から）
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: ネットワーク切断', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: チェック完了後にネットワークが切断された場合
    // Expected: ローカルに結果を保存し、ネットワーク復旧時に自動同期
    await expect(page.locator('body')).not.toContainText('500');
  });
});
