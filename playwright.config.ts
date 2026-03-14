import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 2,
  reporter: "json",
  timeout: 15000,
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3001",
    trace: "off",
  },
  projects: [
    {
      name: "public-pages",
      testMatch: /public\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
