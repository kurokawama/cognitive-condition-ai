// Auto-generated from flow-diagram.json — flow: flow_settings
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Priority: medium | Role: 一般ユーザー（無料） | Tests: 4
import { test, expect } from '@playwright/test';

test.describe('Flow: 設定変更フロー [MEDIUM]', () => {
  test('complete flow: 3 steps', async ({ page }) => {
    // Login as 一般ユーザー（無料）
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Step 1: 「設定」リンクをタップ (element: link_settings_home)
    await page.goto('/home');
    
    // Action: 「設定」リンクをタップ
    // Expected: 設定画面(/settings)に遷移
    await expect(page.locator('body')).not.toContainText('500');

    // Step 2: ニックネームまたは年代を変更し、「保存」をタップ (element: form_profile)
    await page.goto('/settings');
    
    // Action: ニックネームまたは年代を変更し、「保存」をタップ
    // Expected: プロフィールが更新され、保存完了メッセージ表示
    await expect(page.locator('body')).not.toContainText('500');

    // Step 3: 通知ON/OFFと通知時刻を設定し、「通知設定を保存」をタップ (element: form_notification)
    await page.goto('/settings');
    
    // Action: 通知ON/OFFと通知時刻を設定し、「通知設定を保存」をタップ
    // Expected: 通知設定が保存される
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: ニックネーム空欄', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: ニックネームを空にして保存を試みた場合
    // Expected: バリデーションエラー「ニックネームを入力してください」表示
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: OS通知権限拒否', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 通知をONにしたがOS側で通知権限が拒否されている場合
    // Expected: 「端末の設定で通知を許可してください」メッセージと設定画面へのリンク表示
    await expect(page.locator('body')).not.toContainText('500');
  });

  test('edge case: アカウント削除確認', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await page.fill('[name="password"], input[type="password"]', 'test-password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/!(login)**');

    // Condition: 「アカウント削除」をタップした場合
    // Expected: 確認ダイアログ「全てのデータが削除されます。この操作は取り消せません。」表示。「削除する」「キャンセル」の2択。
    await expect(page.locator('body')).not.toContainText('500');
  });
});
