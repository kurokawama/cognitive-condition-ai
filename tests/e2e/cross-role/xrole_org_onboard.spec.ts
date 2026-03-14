// Auto-generated from flow-diagram.json — cross_role: xrole_org_onboard
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Initiator: 法人管理者 → Affected: 一般ユーザー（有料）
import { test, expect, chromium } from '@playwright/test';

test.describe('Cross-role: 法人管理者→メンバー招待（Phase 2）', () => {
  test('法人管理者がメンバーを招待すると、そのユーザーが法人プランとしてプレミアム機能を利用可能になる', async () => {
    const browser = await chromium.launch();
    const baseURL = process.env.BASE_URL || 'http://host.docker.internal:3001';

    // Context: 法人管理者
    const org_adminContext = await browser.newContext();
    const org_adminPage = await org_adminContext.newPage();
    await org_adminPage.goto(baseURL + '/login');
    await org_adminPage.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
    await org_adminPage.fill('[name="password"], input[type="password"]', 'test-password');
    await org_adminPage.click('button[type="submit"]');
    await org_adminPage.waitForURL('**/!(login)**');

    // Context: 一般ユーザー（有料）
    const user_premiumContext = await browser.newContext();
    const user_premiumPage = await user_premiumContext.newPage();
    await user_premiumPage.goto(baseURL + '/login');
    await user_premiumPage.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await user_premiumPage.fill('[name="password"], input[type="password"]', 'test-password');
    await user_premiumPage.click('button[type="submit"]');
    await user_premiumPage.waitForURL('**/!(login)**');

    // 法人管理者: メンバー管理画面(/admin/members)からメールアドレスで招待を送信
    // TODO: Implement action for org_admin

    // 一般ユーザー（有料）: Verify — 招待メール受信→アカウント作成/紐付け→法人プランとしてプレミアム機能を利用可能
    // TODO: Add assertion for user_premium

    // Cleanup
    await org_adminContext.close();
    await user_premiumContext.close();
    await browser.close();
  });
});
