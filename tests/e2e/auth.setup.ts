// Auto-generated from flow-diagram.json — Auth Setup
// DO NOT EDIT MANUALLY. Regenerate with: node generate-playwright-tests.mjs
import { test as setup } from '@playwright/test';

const accounts = [
  { role: 'user', email: 'free@test.example.com', password: 'test-password', storageState: 'user.json' },
  { role: 'user_premium', email: 'premium@test.example.com', password: 'test-password', storageState: 'user_premium.json' },
  { role: 'org_admin', email: 'admin@corp.example.com', password: 'test-password', storageState: 'org_admin.json' }
];

setup('authenticate as 一般ユーザー（無料）', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"], input[type="email"]', 'free@test.example.com');
  await page.fill('[name="password"], input[type="password"]', 'test-password');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/!(login)**');
  await page.context().storageState({ path: 'user.json' });
});

setup('authenticate as 一般ユーザー（有料）', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"], input[type="email"]', 'premium@test.example.com');
  await page.fill('[name="password"], input[type="password"]', 'test-password');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/!(login)**');
  await page.context().storageState({ path: 'user_premium.json' });
});

setup('authenticate as 法人管理者', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"], input[type="email"]', 'admin@corp.example.com');
  await page.fill('[name="password"], input[type="password"]', 'test-password');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/!(login)**');
  await page.context().storageState({ path: 'org_admin.json' });
});
