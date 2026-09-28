import { test, expect } from "../../framework/fixtures";

/** Layout checks that must hold on every phone the app targets (Pixel 9a, iPhone 15/16/17 family). */
test.beforeEach(async ({ planner }) => {
  await planner.goto();
});

test("no horizontal scroll", { tag: "@smoke" }, async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test("both bookmarks sit fully on screen and match in size", async ({ page }) => {
  const vw = page.viewportSize()!.width;
  const left = (await page.locator(".cat-drawer:not(.stop-edge) .cat-toggle").boundingBox())!;
  const right = (await page.locator("#stopDrawer .cat-toggle").boundingBox())!;
  expect(left.x).toBeGreaterThanOrEqual(0);
  expect(right.x + right.width).toBeLessThanOrEqual(vw + 0.5);
  expect(right.x).toBeGreaterThan(vw / 2);
  expect(right.width).toBeCloseTo(left.width, 0);
});

test("day tabs, headings and place cards fit the width", async ({ page }) => {
  const vw = page.viewportSize()!.width;
  for (const sel of ["h1", ".sub", ".findings-head h2", ".spot-card"]) {
    const box = (await page.locator(sel).first().boundingBox())!;
    expect(box.x, sel).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width, sel).toBeLessThanOrEqual(vw + 0.5);
  }
});

test("text stays readable (no body text under 11px)", async ({ page }) => {
  const tiny = await page.evaluate(() =>
    [...document.querySelectorAll("aside p, aside h1, aside h2, aside h3, nav button")]
      .filter((e) => (e as HTMLElement).offsetParent && parseFloat(getComputedStyle(e).fontSize) < 11)
      .map((e) => `${e.tagName}.${(e as HTMLElement).className}`),
  );
  expect(tiny).toEqual([]);
});
