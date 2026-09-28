import { test, expect } from "../../framework/fixtures";
import { DEFAULT_NETWORK } from "../../framework/network/hermetic";
import { DEFAULT_POIS } from "../../framework/mocks";
import { freezeTime, TRIP } from "../../framework/utils/clock";
import { KEYS, poiCache, readStorage, seedStorage } from "../../framework/utils/storage";
import { pois, toCachedItem } from "../../framework/data/builders";
import { PLACES, setLocation } from "../../framework/utils/geo";

// The browser logs every failed request; only the deliberately broken service may do so.
const RESOURCE_FAILED = [/^Failed to load resource/];

// From DEFAULT_POIS: 3 fuel, 2 market, 1 wc.
const COUNTS_TOAST = "⛽ 3 · 🛒 2 · 🚻 1 σε όλο το νησί";

test.describe("OSRM routing", () => {
  test("the day's route is drawn along the returned road geometry with numbered pins", async ({ planner, netLog }) => {
    await planner.goto();
    await expect(planner.routeLines).toHaveCount(1);
    await expect(planner.routePins).toHaveCount(5);
    await expect(planner.routePins.first()).toHaveText("1");
    expect(netLog.served.osrm).toBe(1);
  });

  test.describe("both routers down", () => {
    test.use({ network: { ...DEFAULT_NETWORK, osrm: "fail" }, allowConsole: RESOURCE_FAILED });
    test("pins are still drawn, without a road line, after trying both endpoints", async ({ planner, netLog }) => {
      await planner.goto();
      await expect(planner.routePins).toHaveCount(5);
      await expect.poll(() => netLog.served.osrm).toBe(2);
      await expect(planner.routeLines).toHaveCount(0);
    });
  });

  test("switching day mid-request keeps only the latest day's route", async ({ planner }) => {
    await planner.goto();
    await planner.selectDay("sat");
    await planner.selectDay("mon");
    await expect(planner.routePins).toHaveCount(3);
    await expect(planner.routeLines).toHaveCount(1);
  });
});

test.describe("Overpass POIs", () => {
  test("first toggle fetches the whole island once and toasts the counts", async ({ planner, netLog, page }) => {
    await planner.goto();
    await (await planner.poiButton("fuel")).click();
    await expect(planner.toast).toHaveText(COUNTS_TOAST);
    await expect(await planner.poiButton("fuel")).toHaveAttribute("aria-pressed", "true");
    await (await planner.poiButton("wc")).click();
    // Markers may be clustered, so count the layers' markers rather than pins on screen.
    const onMap = () => page.evaluate(() => {
      const w = window as any;
      const [map, layers] = [w.eval("map"), w.eval("poiLayers")];
      return Object.fromEntries(Object.entries(layers).map(([k, g]: [string, any]) => [k, map.hasLayer(g) ? g.getLayers().length : 0]));
    });
    await expect.poll(onMap).toEqual({ fuel: 3, market: 0, wc: 1 });
    expect(netLog.served.overpass).toBe(1);
  });

  test("results and toggle state are cached in localStorage and reused after reload", async ({ planner, netLog, page }) => {
    await planner.goto();
    await (await planner.poiButton("market")).click();
    await expect(planner.toast).toHaveText(COUNTS_TOAST);
    const cache = await readStorage<{ items: unknown[] }>(page, KEYS.poiCache);
    expect(cache!.items).toEqual(DEFAULT_POIS.map(toCachedItem));
    expect(await readStorage(page, KEYS.poiOn)).toEqual({ fuel: false, market: true, wc: false });

    await page.reload();
    await expect(await planner.poiButton("market")).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".poi-pin")).toHaveCount(2);
    expect(netLog.served.overpass).toBe(1);
  });

  for (const [label, ageDays, fetches] of [["6 days old: reused", 6, 0], ["8 days old: refreshed", 8, 1]] as const) {
    test(`weekly cache, ${label}`, async ({ planner, netLog, page }) => {
      await freezeTime(page, TRIP.sat);
      await seedStorage(page, { [KEYS.poiCache]: poiCache(pois({ fuel: 3 }).map(toCachedItem), ageDays * 864e5, TRIP.sat.getTime()) });
      await planner.goto();
      await (await planner.poiButton("fuel")).click();
      await expect(planner.toast).toHaveText(fetches ? COUNTS_TOAST : "⛽ 3 · 🛒 0 · 🚻 0 σε όλο το νησί");
      expect(netLog.served.overpass ?? 0).toBe(fetches);
    });
  }

  test.describe("Overpass down", () => {
    test.use({ network: { ...DEFAULT_NETWORK, overpass: "fail" }, allowConsole: RESOURCE_FAILED });

    test("no cache: failure toast, both mirrors tried, buttons reset", async ({ planner, netLog }) => {
      await planner.goto();
      await (await planner.poiButton("fuel")).click();
      await expect(planner.toast).toHaveText("Δεν φορτώθηκαν βενζινάδικα/μάρκετ/τουαλέτες. Δοκίμασε ξανά σε λίγο.");
      await expect(await planner.poiButton("fuel")).toHaveAttribute("aria-pressed", "false");
      expect(netLog.served.overpass).toBe(2);
    });

    test("stale cache is used as a fallback", async ({ planner, page }) => {
      await page.addInitScript(() => {
        const item = { type: "fuel", lat: 39.6, lng: 2.7, name: "Old", brand: "", hours: "", fee: "" };
        localStorage.setItem("mallorca-poi-v1", JSON.stringify({ t: 0, items: [item] }));
      });
      await planner.goto();
      await (await planner.poiButton("fuel")).click();
      await expect(planner.toast).toHaveText("⛽ 1 · 🛒 0 · 🚻 0 σε όλο το νησί");
      await expect(page.locator(".poi-pin")).toHaveCount(1);
    });
  });
});

test.describe("Leaflet CDN down", () => {
  test.use({ network: { ...DEFAULT_NETWORK, leaflet: "fail" }, allowConsole: RESOURCE_FAILED });
  test("map shows the fallback and the planner still works", async ({ planner, page, netLog }) => {
    await planner.goto();
    await expect(page.locator("#map .map-fallback")).toContainText("Ο χάρτης δεν φόρτωσε");
    await planner.selectDay("sun");
    await expect(planner.heading).toHaveText(/Κυριακή/);
    expect(netLog.served.leaflet).toBeGreaterThanOrEqual(2); // jsdelivr, then the unpkg fallback
  });
});

test.describe("geolocation", () => {
  test("locate shows the me-dot and centres the map on it", async ({ planner, page, context }) => {
    await setLocation(context, PLACES.palma);
    await planner.goto();
    await (await planner.locateButton()).click();
    await expect(page.locator(".me-dot")).toHaveCount(1);
    await expect(await planner.locateButton()).toHaveClass(/active/);
    const [lat, lng] = await planner.mapCenter();
    expect(lat).toBeCloseTo(PLACES.palma.latitude, 4);
    expect(lng).toBeCloseTo(PLACES.palma.longitude, 4);
  });
});

test.describe("geolocation denied", () => {
  test.use({ permissions: [] });
  test("locate shows the permission toast", async ({ planner, browserName }) => {
    test.skip(browserName !== "chromium", "denial semantics differ per engine");
    await planner.goto();
    await (await planner.locateButton()).click();
    await expect(planner.toast).toHaveText("Δεν δόθηκε άδεια τοποθεσίας — ενεργοποίησέ την στις ρυθμίσεις.");
  });
});
