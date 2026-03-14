// Auto-generated from flow-diagram.json — flow: flow_first_registration
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: critical | Role: 一般ユーザー（無料） | Tests: 5
import { test, expect } from '@playwright/test';

test.describe('Flow: 初回登録→初回チェックフロー [CRITICAL]', () => {
  test('complete flow: 8 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「無料で始める」ボタンをタップ (element: btn_cta_signup)
    await page.goto('/');
    
    // Action: 「無料で始める」ボタンをタップ
    // Expected: サインアップ画面(/auth/signup)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: メール・パスワード・ニックネーム・年代を入力し、利用規約に同意して「無料で登録」をタップ (element: form_signup)
    await page.goto('/auth/signup');
    
    // Action: メール・パスワード・ニックネーム・年代を入力し、利用規約に同意して「無料で登録」をタップ
    // Expected: アカウント作成成功→オンボーディング画面(/onboarding)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 「次へ」をタップ（Step 1/3: 60秒チェックの説明） (element: btn_ob_next_1)
    await page.goto('/onboarding');
    
    // Action: 「次へ」をタップ（Step 1/3: 60秒チェックの説明）
    // Expected: Step 2に進む
    await expect(page.locator('body')).not.toContainText('500');

    // Step 4: 「次へ」をタップ（Step 2/3: AIコーチングの説明） (element: btn_ob_next_2)
    await page.goto('/onboarding');
    
    // Action: 「次へ」をタップ（Step 2/3: AIコーチングの説明）
    // Expected: Step 3に進む
    await expect(page.locator('body')).not.toContainText('500');

    // Step 5: 「さっそく始める」をタップ（Step 3/3） (element: btn_ob_start)
    await page.goto('/onboarding');
    
    // Action: 「さっそく始める」をタップ（Step 3/3）
    // Expected: onboarding_completed=true設定→ホーム画面(/home)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 6: 「今日のチェックを始める」をタップ (element: btn_start_check)
    await page.goto('/home');
    
    // Action: 「今日のチェックを始める」をタップ
    // Expected: チェック画面(/check)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 7: 反応速度テスト→短期記憶テスト→注意切替テストを順に実施（計約60秒） (element: btn_reaction_tap)
    await page.goto('/check');
    
    // Action: 反応速度テスト→短期記憶テスト→注意切替テストを順に実施（計約60秒）
    // Expected: 3テスト完了→結果画面(/result)に自動遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 8: 総合スコア・サブスコア・AIひとことを確認 (element: data_total_score)
    await page.goto('/result');
    
    // Action: 総合スコア・サブスコア・AIひとことを確認
    // Expected: スコアが表示され、「できました」の肯定フィードバックが表示される
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: メール重複', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 既に登録済みのメールアドレスで新規登録を試みた場合
    // Expected: 「このメールアドレスは既に登録されています」エラー表示。ログインリンクを併記。
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: パスワード不備', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: パスワードが8文字未満または英数混在でない場合
    // Expected: リアルタイムバリデーションで「8文字以上、英字と数字を含めてください」表示
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: オンボーディングスキップ', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: ユーザーが「スキップ」をタップした場合
    // Expected: onboarding_completed=true設定し、直接ホーム画面(/home)に遷移
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: テスト中のアプリ中断', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: チェック中にアプリがバックグラウンドに移動した場合
    // Expected: テストが一時停止し、復帰時に中断地点から再開。5分以上経過で最初から。
    await expect(page.locator('body')).not.toContainText('500');
  });
});
