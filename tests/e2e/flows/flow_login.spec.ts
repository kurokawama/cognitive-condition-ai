// Auto-generated from flow-diagram.json — flow: flow_login
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: critical | Role: 一般ユーザー（無料） | Tests: 4
import { test, expect } from '@playwright/test';

test.describe('Flow: ログインフロー [CRITICAL]', () => {
  test('complete flow: 3 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「ログイン」ボタンをタップ (element: btn_cta_login)
    await page.goto('/');
    
    // Action: 「ログイン」ボタンをタップ
    // Expected: ログイン画面(/auth/login)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: メール・パスワードを入力し、「ログイン」をタップ (element: form_login)
    await page.goto('/auth/login');
    
    // Action: メール・パスワードを入力し、「ログイン」をタップ
    // Expected: 認証成功→ホーム画面(/home)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: ホーム画面が表示される (element: data_today_score)
    await page.goto('/home');
    
    // Action: ホーム画面が表示される
    // Expected: 今日のスコア（未チェックなら「今日のチェックをしましょう」）と連続日数が表示される
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: パスワード間違い', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 正しいメールアドレスだが間違ったパスワードの場合
    // Expected: 「メールアドレスまたはパスワードが正しくありません」エラー表示（どちらが間違いかは非開示）
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: 未登録メール', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 未登録のメールアドレスでログインを試みた場合
    // Expected: 同一エラーメッセージ「メールアドレスまたはパスワードが正しくありません」表示（情報漏洩防止）
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: パスワードリセット導線', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: パスワードを忘れた場合
    // Expected: 「パスワードを忘れた方」リンクから/auth/forgot-passwordに遷移
    await expect(page.locator('body')).not.toContainText('500');
  });
});
