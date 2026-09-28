import { test, expect } from "@playwright/test";
import { loadApp } from "../../framework/unit/load-app";

const app = loadApp();
type Stop = { n: string; c: [number, number] };
const stops = (n: number): Stop[] => Array.from({ length: n }, (_, i) => ({ n: `S${i}`, c: [39 + i / 100, 2 + i / 100] }));
const splitLegs = app.run<(s: Stop[]) => Stop[][]>("splitLegs");

test.describe("escAttr", () => {
  test("escapes &, quotes and <", () => {
    expect(app.run<(v: unknown) => string>("escAttr")(`a&b'c"d<e`)).toBe("a&amp;b&#39;c&quot;d&lt;e");
  });
  test("stringifies non-strings", () => {
    expect(app.run<(v: unknown) => string>("escAttr")(42)).toBe("42");
  });
});

test.describe("Google Maps URLs", () => {
  const gmapsUrl = app.run<(o: object) => string>("gmapsUrl");
  test("name-only search appends Mallorca, Spain", () => {
    expect(gmapsUrl({ n: "Deià" })).toBe("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Deià, Mallorca, Spain"));
  });
  test("explicit query wins and place id is appended", () => {
    expect(gmapsUrl({ n: "x", q: "Cala Deià", id: "ChIJabc" })).toBe("https://www.google.com/maps/search/?api=1&query=Cala%20Dei%C3%A0&query_place_id=ChIJabc");
  });
  test("villageUrl uses the village name and gid", () => {
    expect(app.run<(v: object) => string>("villageUrl")({ name: "Sóller", gid: "G1" })).toContain("query=S%C3%B3ller%2C%20Mallorca%2C%20Spain&query_place_id=G1");
  });
  test("stopPlace / stopUrl resolve a spot, a village, or fall back to the stop name", () => {
    const spot = app.app.spots.find((s) => s.id)!;
    expect(app.run<(x: object) => unknown>("stopPlace")({ n: spot.n })).toBe(spot);
    expect(app.run<(x: object) => string>("stopUrl")({ n: spot.n })).toContain("&query_place_id=" + spot.id);
    const v = app.app.villages[0];
    expect(app.run<(x: object) => string>("stopUrl")({ n: v.name })).toContain(encodeURIComponent(v.name));
    expect(app.run<(x: object) => unknown>("stopPlace")({ n: "Nowhere" })).toBeNull();
    expect(app.run<(x: object) => string>("stopUrl")({ n: "Nowhere" })).toContain("query=Nowhere%2C%20Mallorca");
  });
});

test.describe("dirUrl", () => {
  const dirUrl = app.run<(s: Stop[]) => string>("dirUrl");
  const base = "https://www.google.com/maps/dir/?api=1&travelmode=driving";
  test("one stop: destination only (from current position)", () => {
    expect(dirUrl(stops(1))).toBe(base + "&destination=39,2");
  });
  test("two stops: origin and destination, no waypoints", () => {
    expect(dirUrl(stops(2))).toBe(base + "&origin=39,2&destination=39.01,2.01");
  });
  test("middle stops become |-separated, encoded waypoints", () => {
    expect(dirUrl(stops(4))).toBe(base + "&origin=39,2&destination=39.03,2.03&waypoints=" + encodeURIComponent("39.01,2.01|39.02,2.02"));
  });
});

test.describe("splitLegs (Google Maps takes at most 10 stops)", () => {
  for (const n of [1, 2, 10]) {
    test(`${n} stops stay one leg`, () => {
      expect(splitLegs(stops(n))).toEqual([stops(n)]);
    });
  }
  for (const n of [11, 19, 20, 25, 37]) {
    test(`${n} stops: legs of <=10 that share boundary stops and cover every stop in order`, () => {
      const all = stops(n);
      const legs = splitLegs(all);
      expect(legs.length).toBe(Math.ceil((n - 1) / 9));
      for (const leg of legs) expect(leg.length).toBeLessThanOrEqual(10);
      for (let i = 1; i < legs.length; i++) expect(legs[i][0]).toBe(legs[i - 1][legs[i - 1].length - 1]);
      expect(legs[0][0]).toBe(all[0]);
      expect(legs.at(-1)!.at(-1)).toBe(all[n - 1]);
      expect(legs.flatMap((l, i) => (i ? l.slice(1) : l))).toEqual(all);
    });
  }
});

test.describe("spotOnDay", () => {
  const spotOnDay = app.run<(s: object, d: string) => boolean>("spotOnDay");
  test("all / array / both / single day", () => {
    expect(spotOnDay({ day: "all" }, "sun")).toBe(true);
    expect(spotOnDay({ day: ["fri", "mon"] }, "mon")).toBe(true);
    expect(spotOnDay({ day: ["fri", "mon"] }, "sat")).toBe(false);
    expect(spotOnDay({ day: "both" }, "sat")).toBe(true);
    expect(spotOnDay({ day: "sat" }, "sat")).toBe(true);
    expect(spotOnDay({ day: "sat" }, "sun")).toBe(false);
  });
  test("no day means Palma: only fri and mon", () => {
    expect(["fri", "sat", "sun", "mon"].map((d) => spotOnDay({}, d))).toEqual([true, false, false, true]);
  });
});

test.describe("HTML fragments", () => {
  test("ratingHtml: one decimal, count defaults to 0", () => {
    const ratingHtml = app.run<(r: number, n?: number) => string>("ratingHtml");
    expect(ratingHtml(4, 12)).toBe("<span class='stars'>★ 4.0</span> · 12 κριτικές");
    expect(ratingHtml(4.56)).toContain("★ 4.6</span> · 0 κριτικές");
  });
  test("extraHtml: price · hours, then tag; empty when nothing", () => {
    const extraHtml = app.run<(s: object) => string>("extraHtml");
    expect(extraHtml({})).toBe("");
    expect(extraHtml({ price: "€€", hours: "9-17" })).toBe("<p class='spot-extra'>€€ · 9-17</p>");
    expect(extraHtml({ tag: "Κράτηση" })).toBe("<p class='spot-extra spot-flag'>Κράτηση</p>");
  });
  test("poiPopup: escaped name, brand when different, WC fee, nav link", () => {
    const poiPopup = app.run<(p: object) => string>("poiPopup");
    const fuel = poiPopup({ type: "fuel", lat: 39.1, lng: 2.2, name: "<Repsol>", brand: "Repsol", hours: "24/7" });
    expect(fuel).toContain("⛽ &lt;Repsol>");
    expect(fuel).toContain("<small>Repsol | 24/7</small>");
    expect(fuel).toContain("href='https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=39.1,2.2'");
    expect(poiPopup({ type: "wc", lat: 1, lng: 2, name: "", fee: "no" })).toContain("🚻 Τουαλέτα</strong><small>Δωρεάν</small>");
    expect(poiPopup({ type: "wc", lat: 1, lng: 2, fee: "yes" })).toContain("Με χρέωση");
    expect(poiPopup({ type: "market", lat: 1, lng: 2, name: "A", brand: "A" })).not.toContain("<small>");
  });
});
