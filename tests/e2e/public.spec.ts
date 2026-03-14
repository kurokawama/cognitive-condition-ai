// Public page rendering tests — no authentication required
import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("landing page renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("認知コンディション AI");
  });

  test("landing page has register CTA", async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /無料で始める/ });
    await expect(cta).toBeVisible();
  });

  test("landing page has login link", async ({ page }) => {
    await page.goto("/");
    const loginLink = page.getByRole("link", { name: /ログイン/ });
    await expect(loginLink).toBeVisible();
  });

  test("login page renders", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("login form has email and password fields", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("register page renders", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator("h1")).toContainText("新規登録");
  });

  test("register form has required fields", async ({ page }) => {
    await page.goto("/register");
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test("terms page renders", async ({ page }) => {
    await page.goto("/terms");
    await expect(page).not.toHaveTitle(/error/i);
    await expect(page.locator("body")).not.toContainText("404");
  });

  test("unauthenticated user redirected from /home", async ({ page }) => {
    await page.goto("/home");
    // Should redirect to login page
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("unauthenticated user redirected from /check", async ({ page }) => {
    await page.goto("/check");
    await page.waitForURL("**/login**", { timeout: 10000 });
    await expect(page.locator("h1")).toContainText("ログイン");
  });

  test("landing page features section exists", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("1分で完了")).toBeVisible();
    await expect(page.getByText("AIが解釈")).toBeVisible();
    await expect(page.getByText("変化を可視化")).toBeVisible();
  });

  test("login page validation - empty submit shows no server error", async ({ page }) => {
    await page.goto("/login");
    const submitBtn = page.getByRole("button", { name: /ログイン/ });
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();
    // Should not crash with server error
    await expect(page.locator("body")).not.toContainText("500");
  });
});
