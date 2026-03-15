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

  test("login page renders with OTP form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toContainText("ログイン");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.getByRole("button", { name: /確認コード/ })).toBeVisible();
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
