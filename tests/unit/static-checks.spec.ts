import vm from "node:vm";
import { test, expect } from "@playwright/test";
import { APP_JS, INDEX_HTML, STYLES_CSS, loadApp } from "../../framework/unit/load-app";

// Ported from the pre-restructure node:test suite (the checks that still hold).

test("app.js is syntactically valid", () => {
  expect(() => new vm.Script(APP_JS, { filename: "app.js" })).not.toThrow();
});

test("no placeholder imagery", () => {
  expect(APP_JS).not.toMatch(/images\.unsplash\.com/);
  expect(APP_JS).not.toMatch(/\$\{s\.photo\|\|/);
});

test("Overpass query asks for fuel, supermarkets and toilets", () => {
  expect(APP_JS).toMatch(/amenity"="fuel"/);
  expect(APP_JS).toMatch(/shop"="supermarket"/);
  expect(APP_JS).toMatch(/amenity"="toilets"/);
  expect(APP_JS).toMatch(/overpass-api\.de/);
});

test("POI layer types are fuel, market, wc and food; the first three come from OSM", () => {
  const { app } = loadApp();
  expect(Object.keys(app.POI_TYPES)).toEqual(["fuel", "market", "wc", "food"]);
  expect(app.OSM_TYPES).toEqual(["fuel", "market", "wc"]);
});

test("index.html loads Leaflet, markercluster and app.js", () => {
  expect(INDEX_HTML).toMatch(/leaflet@1\.9\.4\/dist\/leaflet\.js/);
  expect(INDEX_HTML).toMatch(/leaflet\.markercluster/);
  expect(INDEX_HTML).toMatch(/<script src="app\.js/);
  for (const id of ["days", "plan", "map"]) expect(INDEX_HTML).toContain(`id="${id}"`);
});

test("CSS regression: the right stops bookmark stays visible at the right edge", () => {
  const marker = "/* CLEAN RIGHT STOPS DRAWER */";
  const at = STYLES_CSS.lastIndexOf(marker);
  expect(at, "marker comment missing").toBeGreaterThanOrEqual(0);
  const block = STYLES_CSS.slice(at);
  expect(block).toMatch(/\.cat-drawer\.stop-edge\{[^}]*transform:translateX\(calc\(100% - 48px\)\) translateY\(-50%\)!important/);
  expect(block).not.toMatch(/\.cat-drawer\.stop-edge\{[^}]*transform:translateX\(236px\)/);
  expect(block).toMatch(/@media\(max-width:600px\)[\s\S]*translateX\(calc\(100% - 40px\)\)/);
});
