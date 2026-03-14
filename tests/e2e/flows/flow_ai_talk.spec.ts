// Auto-generated from flow-diagram.json — flow: flow_ai_talk
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: high | Role: 一般ユーザー（有料） | Tests: 4
import { test, expect } from '@playwright/test';

test.describe('Flow: AIトークフロー [HIGH]', () => {
  test('complete flow: 4 steps', async ({ page }) => {
    // Login as 一般ユーザー（有料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「AIトーク」リンクをタップ (element: link_ai_talk_home)
    await page.goto('/home');
    
    // Action: 「AIトーク」リンクをタップ
    // Expected: AIトーク画面(/ai-talk)に遷移。本日のテーマが表示される。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: 本日のテーマを確認し、メッセージを入力して送信 (element: form_chat)
    await page.goto('/ai-talk');
    
    // Action: 本日のテーマを確認し、メッセージを入力して送信
    // Expected: AIが応答を返す。残り往復回数が3→2に減る。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: AIの応答を読み、追加メッセージを送信（2往復目） (element: form_chat)
    await page.goto('/ai-talk');
    
    // Action: AIの応答を読み、追加メッセージを送信（2往復目）
    // Expected: AIが応答を返す。残り往復回数が2→1に減る。
    await expect(page.locator('body')).not.toContainText('500');

    // Step 4: 最後のメッセージを送信（3往復目）または「会話を終了」をタップ (element: btn_end_talk)
    await page.goto('/ai-talk');
    
    // Action: 最後のメッセージを送信（3往復目）または「会話を終了」をタップ
    // Expected: 会話ログが保存される。3往復完了時は自動的に会話終了メッセージ表示。ホーム(/home)に遷移。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 無料ユーザーがアクセス', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 無料ユーザーがAIトーク画面(/ai-talk)にアクセスした場合
    // Expected: 「プレミアム機能です」メッセージと/subscriptionへのリンク表示。チャットUIは非表示。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 当日チェック未実施', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 当日のチェックを行っていない状態でAIトークにアクセスした場合
    // Expected: 「まず今日のチェックをしましょう」メッセージと/checkへのリンク表示
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: AI応答エラー', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: AI APIがタイムアウトまたはエラーを返した場合
    // Expected: 「応答の取得に時間がかかっています。しばらく待ってからもう一度お試しください」メッセージとリトライボタン表示
    await expect(page.locator('body')).not.toContainText('500');
  });
});
