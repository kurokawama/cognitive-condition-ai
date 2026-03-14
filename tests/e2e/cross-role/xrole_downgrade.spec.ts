// Auto-generated from flow-diagram.json — cross_role: xrole_downgrade
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
// Initiator: 一般ユーザー（有料） → Affected: 一般ユーザー（無料）
import { test, expect, chromium } from '@playwright/test';

test.describe('Cross-role: 有料→無料ダウングレード', () => {
  test('有料ユーザーが解約すると、期間終了後にfreeに降格。AI分析・AIトークが利用不可になるが、過去の分析結果は閲覧可能。', async () => {
    const browser = await chromium.launch();
    const baseURL = process.env.BASE_URL || 'http://host.docker.internal:3001';

    // Context: 一般ユーザー（有料）
    const user_premiumContext = await browser.newContext();
    const user_premiumPage = await user_premiumContext.newPage();
    await user_premiumPage.goto(baseURL + '/login');
    await user_premiumPage.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
    await user_premiumPage.fill('[name="password"], input[type="password"]', 'test-password');
    await user_premiumPage.click('button[type="submit"]');
    await user_premiumPage.waitForURL('**/!(login)**');

    // Context: 一般ユーザー（無料）
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
    await userPage.goto(baseURL + '/login');
    await userPage.fill('[name="email"], input[type="email"]', 'free@test.example.com');
    await userPage.fill('[name="password"], input[type="password"]', 'test-password');
    await userPage.click('button[type="submit"]');
    await userPage.waitForURL('**/!(login)**');

    // 一般ユーザー（有料）: 課金画面で「プランを解約する」をタップし確認ダイアログで承認
    // TODO: Implement action for user_premium

    // 一般ユーザー（無料）: Verify — 期間終了後にfreeに降格。AI分析はぼかしプレビューに戻る。AIトークは利用不可。過去の分析結果は読み取り専用で閲覧可能。
    // TODO: Add assertion for user

    // Cleanup
    await user_premiumContext.close();
    await userContext.close();
    await browser.close();
  });
});
