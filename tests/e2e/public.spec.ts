// Public page rendering tests — no authentication required (B2C Revival v3)
import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("landing page renders with correct H1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("認知力");
  });

  test("landing page has CTA button", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /無料で.*チェック|無料で始める/ }).first();
    await expect(cta).toBeVisible();
  });

  test("landing page has login link", async ({ page }) => {
    await page.goto("/");
    const loginLink = page.getByRole("link", { name: /ログイン/ });
    await expect(loginLink).toBeVisible();
  });

  test("landing page has social proof", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/25,000/)).toBeVisible();
  });

  test("landing page has FAQ section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("よくある質問")).toBeVisible();
  });

  test("landing page has PMDA disclaimer in footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("医療診断を行うものではありません")).toBeVisible();
  });

  test("login page renders with email+password form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toContainText("ログイン");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /ログイン/ })).toBeVisible();
  });

  test("privacy policy page renders", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toContainText("プライバシーポリシー");
    await expect(page.getByText("個人情報の保護")).toBeVisible();
  });

  test("tokushoho page renders", async ({ page }) => {
    await page.goto("/tokushoho");
    await expect(page.locator("h1")).toContainText("特定商取引法に基づく表記");
    await expect(page.getByText("黒川 雅史").first()).toBeVisible();
    await expect(page.getByText("キャンセル・解約")).toBeVisible();
  });

  test("check-demo page renders", async ({ page }) => {
    await page.goto("/check-demo");
    await expect(page.getByText("無料チェック体験")).toBeVisible();
    await expect(page.getByRole("button", { name: /チェックを始める/ })).toBeVisible();
  });

  test("about page renders", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("認知コンディション AIとは")).toBeVisible();
    await expect(page.getByText("安全性について")).toBeVisible();
  });

  test("blog page renders with articles", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText("ブログ")).toBeVisible();
  });

  test("blog article page renders", async ({ page }) => {
    await page.goto("/blog/what-is-cognitive-conditioning");
    await expect(page.locator("h1")).toContainText("認知コンディション");
  });

  test("subscription page renders without auth", async ({ page }) => {
    await page.goto("/subscription");
    await expect(page.getByText(/プレミアム/).first()).toBeVisible();
    await expect(page.getByText(/¥580/).first()).toBeVisible();
  });

  test("terms page renders", async ({ page }) => {
    await page.goto("/terms");
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator("body")).not.toContainText("404");
  });

  test("unauthenticated user redirected from /home", async ({ page }) => {
    await page.goto("/home");
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("unauthenticated user redirected from /check", async ({ page }) => {
    await page.goto("/check");
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("no red colors on landing page (PMDA)", async ({ page }) => {
    await page.goto("/");
    const redElements = await page.locator('[class*="red"]').count();
    expect(redElements).toBe(0);
  });
});

test.describe("Button & Link Navigation Tests", () => {
  test("LP: CTA '無料でチェックしてみる' navigates to /check-demo", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /無料でチェックしてみる/ });
    await cta.click();
    await page.waitForURL("**/check-demo**", { timeout: 10000 });
    await expect(page.getByText("無料チェック体験")).toBeVisible();
  });

  test("LP: 'ログイン' navigates to /login", async ({ page }) => {
    await page.goto("/");
    const login = page.getByRole("link", { name: /ログイン/ });
    await login.click();
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("LP: '無料で始める' navigates to /login (signup)", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("link", { name: /無料で始める/ });
    await btn.click();
    // Unauthenticated users are redirected to login/signup
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("LP: '体験チェックを始める' navigates to /check-demo", async ({ page }) => {
    await page.goto("/");
    const btn = page.getByRole("link", { name: /体験チェックを始める/ });
    await btn.click();
    await page.waitForURL("**/check-demo**", { timeout: 10000 });
  });

  test("LP: footer links navigate correctly", async ({ page }) => {
    await page.goto("/");

    // サービス概要
    await page.getByRole("link", { name: "サービス概要" }).click();
    await page.waitForURL("**/about**", { timeout: 10000 });
    await expect(page.getByText("認知コンディション AIとは")).toBeVisible();

    // 利用規約
    await page.goto("/");
    await page.getByRole("link", { name: "利用規約" }).click();
    await page.waitForURL("**/terms**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("利用規約");

    // プライバシーポリシー
    await page.goto("/");
    await page.getByRole("link", { name: "プライバシーポリシー" }).click();
    await page.waitForURL("**/privacy**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("プライバシーポリシー");

    // 特定商取引法
    await page.goto("/");
    await page.getByRole("link", { name: "特定商取引法に基づく表記" }).click();
    await page.waitForURL("**/tokushoho**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("特定商取引法に基づく表記");
  });

  test("check-demo: 'チェックを始める' button starts the check", async ({ page }) => {
    await page.goto("/check-demo");
    const startBtn = page.getByRole("button", { name: /チェックを始める/ });
    await startBtn.click();
    // After clicking, the check game should start (反応速度 task)
    await expect(page.getByRole("heading", { name: "反応速度" })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText("1/3")).toBeVisible();
  });

  test("login: 'アカウントをお持ちでない方' toggles to signup form", async ({ page }) => {
    await page.goto("/login");
    const toggleBtn = page.getByRole("button", { name: /アカウントをお持ちでない方/ });
    await toggleBtn.click();
    // Should show signup form elements
    await expect(page.getByRole("button", { name: /新規登録|アカウント作成/ })).toBeVisible({ timeout: 5000 });
  });

  test("subscription: billing cycle toggle switches plans", async ({ page }) => {
    await page.goto("/subscription");
    // Click 月額 tab
    const monthlyBtn = page.getByRole("button", { name: "月額", exact: true });
    await monthlyBtn.click();
    await expect(page.getByText("¥580").first()).toBeVisible();

    // Click 年額 tab
    const yearlyBtn = page.getByRole("button", { name: "年額", exact: true });
    await yearlyBtn.click();
    await expect(page.getByText("¥4,800").first()).toBeVisible();
  });

  test("subscription: FAQ accordion opens on click", async ({ page }) => {
    await page.goto("/subscription");
    const faq = page.locator("details").first();
    await faq.click();
    // After opening, the details content should be visible
    const content = faq.locator("p");
    await expect(content.first()).toBeVisible({ timeout: 3000 });
  });

  test("LP: FAQ accordion opens on click", async ({ page }) => {
    await page.goto("/");
    const faq = page.locator("details").first();
    await faq.click();
    const content = faq.locator("p, div").first();
    await expect(content).toBeVisible({ timeout: 3000 });
  });
});
