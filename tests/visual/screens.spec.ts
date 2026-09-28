import { test, expect } from "../../framework/fixtures";
import { Day } from "../../framework/pages/planner.page";

// Linux Chromium baselines under tests/visual/__screenshots__/. The map is masked: tiles are a
// mocked pixel and marker placement is Leaflet's, not the app's.
test.use({ viewport: { width: 1280, height: 800 } });

for (const day of ["fri", "sat", "sun", "mon"] as Day[]) {
  test(`plan panel ${day}`, async ({ planner }) => {
    await planner.goto();
    await planner.selectDay(day);
    await expect(planner.page.locator("aside")).toHaveScreenshot(`aside-${day}.png`);
  });
}

test("full page with drawers open", async ({ planner, page }) => {
  await planner.goto();
  await planner.swipe(planner.catDrawer, 80);
  await planner.swipe(planner.stopDrawer, -80);
  await expect(page).toHaveScreenshot("drawers-open.png", { mask: [page.locator(".leaflet-pane")] });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 412, height: 839 }, isMobile: true, hasTouch: true });
  test("first screen", async ({ planner, page }) => {
    await planner.goto();
    await expect(page).toHaveScreenshot("mobile-first-screen.png", { mask: [page.locator(".leaflet-pane")] });
  });
});
