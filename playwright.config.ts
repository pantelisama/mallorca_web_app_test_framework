import { defineConfig, devices } from "@playwright/test";
import { BASE_URL, IS_CI } from "./framework/config/env";

const chromium = { ...devices["Desktop Chrome"] };

export default defineConfig({
  outputDir: "reports/test-results",
  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: IS_CI ? 1 : 0,
  workers: IS_CI ? 2 : undefined,
  reporter: [
    IS_CI ? ["github"] : ["list"],
    ["html", { outputFolder: "reports/html", open: "never" }],
    ["json", { outputFile: "reports/results.json" }],
    ["./framework/healing/heal-reporter.ts"],
  ],
  use: {
    baseURL: BASE_URL,
    locale: "el-GR",
    timezoneId: "Europe/Madrid",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: "disabled" } },
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
  webServer: {
    command: "npx tsx framework/server/static-server.ts",
    url: BASE_URL,
    reuseExistingServer: !IS_CI,
  },
  projects: [
    { name: "unit", testDir: "tests/unit" },
    { name: "integration", testDir: "tests/integration", use: chromium },
    { name: "e2e-chromium", testDir: "tests/e2e", use: chromium },
    { name: "e2e-firefox", testDir: "tests/e2e", use: { ...devices["Desktop Firefox"] } },
    { name: "e2e-webkit", testDir: "tests/e2e", use: { ...devices["Desktop Safari"] } },
    { name: "e2e-mobile", testDir: "tests/e2e", use: { ...devices["Pixel 7"] } },
    { name: "e2e-iphone", testDir: "tests/e2e", use: { ...devices["iPhone 14"] } },
    { name: "a11y", testDir: "tests/a11y", use: chromium },
    // Timing is measured alone: parallel workers on the same CPU distort LCP/TBT.
    { name: "performance", testDir: "tests/performance", use: chromium, fullyParallel: false },
    { name: "visual", testDir: "tests/visual", use: chromium },
    // Seed for the Playwright planner/generator/healer agents (docs/AGENTIC.md).
    { name: "agentic", testDir: "tests", testMatch: "seed.spec.ts", use: chromium },
  ],
});
