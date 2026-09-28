import type { Page } from "@playwright/test";
import type { PoiFixture } from "../mocks";

/** localStorage keys the app owns (app.js). */
export const KEYS = { poiCache: "mallorca-poi-v1", poiOn: "mallorca-poi-on-v2", enrich: "mallorca-enrich-v1" } as const;

export type PoiItem = Required<Omit<PoiFixture, "name" | "brand" | "hours" | "fee">> & { name: string; brand: string; hours: string; fee: string };

/** Seeds localStorage before the app's scripts run, once per test (a reload keeps what the app wrote). */
export async function seedStorage(page: Page, entries: Record<string, unknown>): Promise<void> {
  await page.addInitScript((e) => {
    if (sessionStorage.getItem("__seeded")) return;
    sessionStorage.setItem("__seeded", "1");
    for (const [k, v] of Object.entries(e)) localStorage.setItem(k, JSON.stringify(v));
  }, entries);
}

export function readStorage<T>(page: Page, key: string): Promise<T | null> {
  return page.evaluate((k) => JSON.parse(localStorage.getItem(k) ?? "null"), key);
}

/** A POI cache entry as the app writes it; `ageMs` back from `now`. */
export function poiCache(items: PoiItem[], ageMs: number, now = Date.now()) {
  return { t: now - ageMs, items };
}
