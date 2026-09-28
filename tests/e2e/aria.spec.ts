import { test, expect } from "../../framework/fixtures";

// ARIA snapshots, written from the labels declared in app.js (days[], POI_TYPES, control
// aria-labels, routes.fri), not copied from a run. They pin what assistive tech exposes.

test.beforeEach(async ({ planner }) => {
  await planner.goto();
});

test("day navigation", { tag: "@smoke" }, async ({ page }) => {
  await expect(page.locator("#days")).toMatchAriaSnapshot(`
    - navigation:
      - button "Παρ 16"
      - button "Σαβ 17"
      - button "Κυρ 18"
      - button "Δευ 19"
  `);
});

test("day panel heading and saved places", async ({ planner }) => {
  await expect(planner.plan).toMatchAriaSnapshot(`
    - heading "Παρ 16 · Πρόγραμμα" [level=2]
    - heading "Αποθηκευμένα μέρη" [level=2]
  `);
});

test("map layer controls expose names and pressed state", { tag: "@smoke" }, async ({ page }) => {
  await expect(page.locator(".poi-control")).toMatchAriaSnapshot(`
    - button "Βενζινάδικα" [pressed=false]
    - button "Σούπερ μάρκετ" [pressed=false]
    - button "Τουαλέτες" [pressed=false]
    - button "Φαγητό" [pressed=true]
  `);
  await expect(page.locator(".map-actions")).toMatchAriaSnapshot(`
    - button "Εμφάνιση διαδρομής"
    - button "Πλοήγηση"
  `);
  await expect(page.locator(".locate-btn")).toMatchAriaSnapshot(`- button "Η θέση μου"`);
});

test("stops drawer lists Friday's stops in order", async ({ planner }) => {
  await expect(planner.stopDrawer).toMatchAriaSnapshot(`
    - strong: Στάσεις στον χάρτη
    - button "01 Airport"
    - button "02 Playa de Muro"
    - button "03 s'Albufera"
    - button "04 Port d’Alcúdia"
    - button "05 Alcúdia Old Town"
    - button "Άνοιξε στάσεις"
  `);
});

test("categories drawer has a named toggle and category chips", async ({ planner }) => {
  await expect(planner.catDrawer).toMatchAriaSnapshot(`
    - strong: Μέρη στον χάρτη
    - button /Φαγητό \\d+/
    - button /Χωριά \\d+/
    - button "Άνοιξε κατηγορίες"
  `);
});
