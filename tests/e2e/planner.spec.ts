import { test, expect } from "../../framework/fixtures";
import { DAY_LABELS, Day } from "../../framework/pages/planner.page";
import { APP_BUGS } from "../../framework/config/known-issues";

test.beforeEach(async ({ planner }) => {
  await planner.goto();
});

test.describe("days", () => {
  test("Friday is selected on load", { tag: "@smoke" }, async ({ planner }) => {
    await expect(await planner.dayButton("fri")).toHaveClass(/active/);
    await expect(planner.heading).toHaveText("Παρασκευή 16 · Airport → Alcúdia");
  });

  for (const day of Object.keys(DAY_LABELS) as Day[]) {
    test(`selecting ${day} shows its title, plan and stops`, async ({ planner, page }) => {
      await planner.selectDay(day);
      await expect(page.locator("#days .active")).toHaveCount(1);
      await expect(planner.plan.locator("h2").first()).toHaveText(`${DAY_LABELS[day]} · Πρόγραμμα`);
      await expect(planner.subtitle).not.toBeEmpty();
      await expect(page.locator("#stopFilters .stop-item").first()).toBeAttached();
    });
  }
});

test.describe("saved places", () => {
  test("clicking a spot card opens it in Google Maps", async ({ planner }) => {
    await planner.spotCards.first().click();
    await expect(planner.page).toHaveOpenedUrl(/^https:\/\/www\.google\.com\/maps\/search\/\?api=1&query=/);
    expect(await planner.opened()).toHaveLength(1);
  });

  test("Enter on a focused spot card opens it", async ({ planner }) => {
    await planner.spotCards.first().focus();
    await planner.page.keyboard.press("Enter");
    expect(await planner.opened()).toHaveLength(1);
  });

  test("a village card opens its panel, centred on the village", async ({ planner }) => {
    await planner.selectDay("sat");
    const card = planner.villageCards.first();
    const name = (await card.locator("h3").textContent())!;
    await card.click();
    await expect(planner.plan.locator("h2")).toHaveText(`🏘️ ${name}`);
    await expect.poll(() => planner.mapCenter()).toEqual([39.7822, 2.741]); // Fornalutx
  });

  test("the village panel offers Google Maps, navigation and Back", async ({ planner }) => {
    test.fail(true, APP_BUGS.villageToolsHidden);
    await planner.selectDay("sat");
    await planner.villageCards.first().click();
    await expect(planner.plan.getByRole("link", { name: "Google Maps" })).toHaveAttribute("href", /google\.com\/maps\/search/);
    await expect(planner.plan.getByRole("link", { name: "🧭 Πλοήγηση" })).toHaveAttribute("href", /google\.com\/maps\/dir\/.*destination=/);
    await (await planner.backButton()).click();
    await expect(planner.plan.locator("h2").first()).toHaveText("Σαβ 17 · Πρόγραμμα");
  });
});

test.describe("categories drawer", () => {
  test("toggle opens, close closes", async ({ planner }) => {
    test.fail(true, APP_BUGS.drawerToggleClick);
    await (await planner.catToggle()).click();
    await expect(planner.catDrawer).toHaveClass(/open/);
    await (await planner.catClose()).click();
    await expect(planner.catDrawer).not.toHaveClass(/open/);
  });

  test("swipe right opens, swipe left closes", async ({ planner }) => {
    await planner.swipe(planner.catDrawer, 80);
    await expect(planner.catDrawer).toHaveClass(/open/);
    await planner.swipe(planner.catDrawer, -80);
    await expect(planner.catDrawer).not.toHaveClass(/open/);
  });

  test("a short swipe does nothing", async ({ planner }) => {
    await planner.swipe(planner.catDrawer, 40);
    await expect(planner.catDrawer).not.toHaveClass(/open/);
  });

  test("clicking a category chip toggles its layer", async ({ planner }) => {
    test.fail(true, APP_BUGS.drawerToggleClick);
    await planner.swipe(planner.catDrawer, 80);
    const chip = await planner.filterChip("food");
    await chip.click();
    await expect(chip).not.toHaveClass(/active/, { timeout: 2000 });
  });

  test("a category chip (keyboard) hides and shows its cards and the food map button", async ({ planner, page }) => {
    await planner.swipe(planner.catDrawer, 80);
    const chip = await planner.filterChip("food");
    const food = planner.plan.locator(".spot-card[data-cat='food']");
    await expect(chip).toHaveClass(/active/);
    await expect(food.first()).toBeVisible();
    await chip.focus();
    await page.keyboard.press("Enter");
    await expect(chip).not.toHaveClass(/active/);
    await expect(food.first()).toBeHidden();
    await expect(await planner.poiButton("food")).toHaveAttribute("aria-pressed", "false");
    await page.keyboard.press("Enter");
    await expect(food.first()).toBeVisible();
  });
});

test.describe("stops drawer", () => {
  test("toggle is on screen when closed", async ({ planner }) => {
    test.fail(true, APP_BUGS.stopToggleOffscreen);
    await expect(await planner.stopToggle()).toBeInViewport({ timeout: 2000 });
  });

  test("toggle opens, close closes", async ({ planner }) => {
    test.fail(true, APP_BUGS.drawerToggleClick);
    await (await planner.stopToggle()).click({ timeout: 3000 });
    await expect(planner.stopDrawer).toHaveClass(/open/);
    await (await planner.stopClose()).click({ timeout: 3000 });
    await expect(planner.stopDrawer).not.toHaveClass(/open/);
  });

  test("swipe left opens, swipe right closes", async ({ planner }) => {
    await planner.swipe(planner.stopDrawer, -80);
    await expect(planner.stopDrawer).toHaveClass(/open/);
    await planner.swipe(planner.stopDrawer, 80);
    await expect(planner.stopDrawer).not.toHaveClass(/open/);
  });

  test("clicking a stop centres the map on it", async ({ planner }) => {
    test.fail(true, APP_BUGS.drawerToggleClick);
    await planner.swipe(planner.stopDrawer, -80);
    await (await planner.stopItem(1)).click();
    await expect(planner.stopDrawer).not.toHaveClass(/open/, { timeout: 2000 });
  });

  test("choosing a stop (keyboard) centres the map on it and closes the drawer", async ({ planner, page }) => {
    await planner.swipe(planner.stopDrawer, -80);
    await (await planner.stopItem(1)).focus();
    await page.keyboard.press("Enter");
    await expect(planner.stopDrawer).not.toHaveClass(/open/);
    await expect.poll(() => planner.mapCenter()).toEqual([39.7942, 3.1174]); // Playa de Muro
  });
});

test.describe("map controls", () => {
  test("route button hides and re-shows the day's route", async ({ planner }) => {
    await expect(planner.routePins).toHaveCount(5);
    await (await planner.routeAction()).click();
    await expect(planner.routePins).toHaveCount(0);
    await (await planner.routeAction()).click();
    await expect(planner.routePins).toHaveCount(5);
  });

  test("navigation button opens Google directions for the first leg", { tag: "@smoke" }, async ({ planner }) => {
    await (await planner.navAction()).click();
    // Friday's stops, from routes.fri in app.js.
    await expect(planner.page).toHaveOpenedUrl(
      "https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=39.5517,2.7388&destination=39.8525,3.1192&waypoints=" +
        encodeURIComponent("39.7942,3.1174|39.7881,3.1068|39.8412,3.1315"),
    );
  });

  for (const k of ["fuel", "market", "wc"] as const) {
    test(`${k} layer button toggles aria-pressed`, async ({ planner }) => {
      const b = await planner.poiButton(k);
      await b.click();
      await expect(b).toHaveAttribute("aria-pressed", "true");
      await expect(planner.toast).toHaveText(/σε όλο το νησί/);
      await b.click();
      await expect(b).toHaveAttribute("aria-pressed", "false");
    });
  }

  test("food layer button and the food chip are the same layer", async ({ planner }) => {
    const b = await planner.poiButton("food");
    await expect(b).toHaveAttribute("aria-pressed", "true");
    await b.click();
    await expect(b).toHaveAttribute("aria-pressed", "false");
    await expect(await planner.filterChip("food")).not.toHaveClass(/active/);
  });

  test.describe("location", () => {
    test.use({ geolocation: { latitude: 39.7, longitude: 2.9 }, permissions: ["geolocation"] });
    test("locate button shows where you are", async ({ planner, page }) => {
      await (await planner.locateButton()).click();
      await expect(page.locator(".me-dot")).toBeVisible();
    });
  });
});
