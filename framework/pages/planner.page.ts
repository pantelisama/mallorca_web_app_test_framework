import { expect, Locator, Page, test, TestInfo } from "@playwright/test";
import { Candidate, heal } from "../healing/healer";

export type Day = "fri" | "sat" | "sun" | "mon";
export const DAY_LABELS: Record<Day, string> = { fri: "Παρ 16", sat: "Σαβ 17", sun: "Κυρ 18", mon: "Δευ 19" };
export type Poi = "fuel" | "market" | "wc" | "food";
const POI_LABELS: Record<Poi, string> = { fuel: "Βενζινάδικα", market: "Σούπερ μάρκετ", wc: "Τουαλέτες", food: "Φαγητό" };

/**
 * The planner as a user sees it. Every interactive element is resolved through the healer:
 * the first candidate is the contract, the rest are recorded fallbacks.
 */
export class PlannerPage {
  constructor(readonly page: Page, private readonly testInfo: TestInfo) {}

  private find(element: string, candidates: Candidate[], root: Page | Locator = this.page): Promise<Locator> {
    return heal(root, element, candidates, { testInfo: this.testInfo });
  }

  async goto(): Promise<void> {
    await test.step("open the planner", async () => {
      await this.page.goto("/");
      await expect(this.page.locator("#plan .day-panel")).toBeVisible();
    }, { box: true });
  }

  get heading() { return this.page.locator("aside h1"); }
  get subtitle() { return this.page.locator("aside .sub"); }
  get plan() { return this.page.locator("#plan"); }
  get catDrawer() { return this.page.locator(".cat-drawer:not(.stop-edge)"); }
  get stopDrawer() { return this.page.locator("#stopDrawer"); }
  get toast() { return this.page.locator(".map-toast"); }
  get spotCards() { return this.page.locator("#plan .spot-card[data-spot-index]"); }
  get villageCards() { return this.page.locator("#plan .village-card[data-village]"); }
  get routeLines() { return this.page.locator(".leaflet-overlay-pane path.leaflet-interactive"); }
  get routePins() { return this.page.locator(".leaflet-marker-pane .route-pin"); }

  dayButton(day: Day) {
    return this.find(`day button ${day}`, [
      { by: "role", role: "button", name: DAY_LABELS[day], exact: true },
      { by: "css", selector: `[data-day='${day}']` },
    ], this.page.locator("#days"));
  }

  async selectDay(day: Day): Promise<void> {
    await test.step(`select day ${day}`, async () => {
      await (await this.dayButton(day)).click();
      await expect(await this.dayButton(day)).toHaveClass(/active/);
    }, { box: true });
  }

  catToggle() {
    return this.find("categories drawer toggle", [
      { by: "role", role: "button", name: "Άνοιξε κατηγορίες" },
      { by: "css", selector: ".cat-drawer:not(.stop-edge) .cat-toggle" },
    ]);
  }
  catClose() {
    return this.find("categories drawer close", [{ by: "css", selector: ".cat-drawer:not(.stop-edge) .cat-close" }]);
  }
  filterChip(cat: string) {
    return this.find(`filter chip ${cat}`, [
      { by: "css", selector: `#filters [data-cat='${cat}']` },
      { by: "testid", id: `filter-${cat}` },
    ]);
  }
  stopToggle() {
    return this.find("stops drawer toggle", [
      { by: "role", role: "button", name: "Άνοιξε στάσεις" },
      { by: "css", selector: "#stopDrawer .stop-toggle" },
    ]);
  }
  stopClose() {
    return this.find("stops drawer close", [{ by: "css", selector: "#stopDrawer .stop-close" }]);
  }
  stopItem(i: number) {
    return this.find(`stop item ${i}`, [{ by: "css", selector: `#stopFilters .stop-item[data-stop-index='${i}']` }]);
  }
  routeAction() {
    return this.find("route action", [
      { by: "role", role: "button", name: "Εμφάνιση διαδρομής" },
      { by: "css", selector: ".map-actions .route-action" },
    ]);
  }
  navAction() {
    return this.find("navigation action", [
      { by: "role", role: "button", name: "Πλοήγηση", exact: true },
      { by: "css", selector: ".map-actions .nav-action" },
    ]);
  }
  poiButton(k: Poi) {
    return this.find(`poi button ${k}`, [
      { by: "role", role: "button", name: POI_LABELS[k], exact: true },
      { by: "css", selector: `[data-poi='${k}']` },
    ], this.page.locator(".poi-control"));
  }
  locateButton() {
    return this.find("locate button", [
      { by: "role", role: "button", name: "Η θέση μου" },
      { by: "css", selector: ".locate-btn" },
    ]);
  }
  backButton() {
    return this.find("village back button", [{ by: "role", role: "button", name: "Back" }], this.plan);
  }

  /** URLs passed to window.open (stubbed by the fixture). */
  opened(): Promise<string[]> {
    return this.page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
  }

  /** Current Leaflet map centre, read from the app's global map. */
  mapCenter(): Promise<[number, number]> {
    return this.page.evaluate(() => {
      const c = (window as any).eval("map").getCenter();
      return [c.lat, c.lng] as [number, number];
    });
  }

  /** Mouse swipe starting on the drawer's visible edge, dx pixels horizontally. */
  async swipe(drawer: Locator, dx: number): Promise<void> {
    await test.step(`swipe ${dx}px`, async () => {
      const box = await drawer.boundingBox();
      if (!box) throw new Error("drawer has no box");
      // Start on the visible edge, keeping the whole gesture inside the viewport.
      const x = Math.min(Math.max(box.x + box.width - 20, 10 - Math.min(dx, 0)), this.page.viewportSize()!.width - 10 - Math.max(dx, 0));
      const y = box.y + box.height / 2;
      // A real mouse gesture: synthetic pointer events have no active pointer, and Firefox
      // rejects setPointerCapture for them.
      await this.page.mouse.move(x, y);
      await this.page.mouse.down();
      await this.page.mouse.move(x + dx, y, { steps: 5 });
      await this.page.mouse.up();
    }, { box: true });
  }
}
