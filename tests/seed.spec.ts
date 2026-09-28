import { test, expect } from "../framework/fixtures";

// Seed for the Playwright agents: hermetic network, stubbed window.open, planner loaded.
test("seed", async ({ planner }) => {
  await planner.goto();
  await expect(planner.heading).toBeVisible();
});
