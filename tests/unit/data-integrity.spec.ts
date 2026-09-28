import { test, expect } from "@playwright/test";
import { loadApp } from "../../framework/unit/load-app";

const { app } = loadApp();
const DAY_IDS = app.days.map((d) => d.id);
const [S, W, N, E] = app.MALLORCA_BBOX.split(",").map(Number);
const inside = ([lat, lng]: [number, number]) => lat >= S && lat <= N && lng >= W && lng <= E;

test("the four trip days, in order", () => {
  expect(DAY_IDS).toEqual(["fri", "sat", "sun", "mon"]);
});

test("every plan row names an existing category", () => {
  for (const d of app.days) for (const row of d.plan) expect(Object.keys(app.categories), `${d.id}: ${row[1]}`).toContain(row[3]);
});

test("every spot has a valid category and day", () => {
  for (const s of app.spots) {
    expect(Object.keys(app.categories), s.n).toContain(s.cat);
    const days = s.day === undefined ? [] : Array.isArray(s.day) ? s.day : [s.day];
    for (const d of days) expect([...DAY_IDS, "all", "both"], s.n).toContain(d);
  }
});

test("every spot, village and route stop lies inside the Mallorca bounding box", () => {
  for (const s of app.spots) expect(inside(s.c), s.n).toBe(true);
  for (const v of app.villages) expect(inside(v.c), v.name).toBe(true);
  for (const [id, r] of Object.entries(app.routes)) for (const x of r.stops) expect(inside(x.c), `${id}: ${x.n}`).toBe(true);
});

test("ratings are within 0-5 and review counts are non-negative", () => {
  for (const s of app.spots.filter((s) => s.rating != null)) {
    expect(s.rating!, s.n).toBeGreaterThanOrEqual(0);
    expect(s.rating!, s.n).toBeLessThanOrEqual(5);
    if (s.reviews != null) expect(s.reviews, s.n).toBeGreaterThanOrEqual(0);
  }
});

test("routes exist only for trip days and each stop has a known pin type and size", () => {
  for (const [id, r] of Object.entries(app.routes)) {
    expect(DAY_IDS).toContain(id);
    expect(r.stops.length).toBeGreaterThan(0);
    for (const x of r.stops) {
      expect(["food", "beach", "village", "sight"], x.n).toContain(x.type);
      expect(["long", "small"], x.n).toContain(x.size);
    }
  }
});

test("village ids are unique", () => {
  const ids = app.villages.map((v) => v.id);
  expect(new Set(ids).size).toBe(ids.length);
});
