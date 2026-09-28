import { test, expect } from "@playwright/test";
import { loadApp } from "../../framework/unit/load-app";

// Rendering without Leaflet (jsdom has no map): the planner must still be fully usable.

test("renders the Friday plan, day buttons and category chips", () => {
  const { document: d } = loadApp();
  expect(d.querySelector("#plan")!.innerHTML).toMatch(/Παρ 16 · Πρόγραμμα/);
  expect([...d.querySelectorAll("#days [data-day]")].map((b) => b.textContent)).toEqual(["Παρ 16", "Σαβ 17", "Κυρ 18", "Δευ 19"]);
  expect(d.querySelector("#days .active")!.getAttribute("data-day")).toBe("fri");
  expect(d.querySelector("#filters")!.innerHTML).toMatch(/Χωριά/);
  expect(d.querySelector("#filters")!.innerHTML).toMatch(/Οινοποιεία/);
});

test("without Leaflet the map shows a fallback message and the plan still renders", () => {
  const { document: d } = loadApp();
  expect(d.querySelector("#map")!.textContent).toContain("Ο χάρτης δεν φόρτωσε");
  expect(d.querySelectorAll("#plan .spot-card").length).toBeGreaterThan(0);
});

test("clicking a day re-renders title, subtitle, active button and stops drawer", () => {
  const a = loadApp();
  const d = a.document;
  for (const day of a.app.days) {
    (d.querySelector(`#days [data-day='${day.id}']`) as HTMLElement).click();
    expect(a.app.currentDay).toBe(day.id);
    expect(d.querySelector("h1")!.textContent).toBe(day.title);
    expect(d.querySelector(".sub")!.textContent).toBe(day.sub);
    expect(d.querySelector("#days .active")!.getAttribute("data-day")).toBe(day.id);
    expect(d.querySelector("#plan h2")!.textContent).toBe(`${day.label} · Πρόγραμμα`);
    const names = [...d.querySelectorAll("#stopFilters .stop-item .cat-label")].map((e) => e.textContent);
    expect(names).toEqual(a.app.routes[day.id].stops.map((s) => s.n));
  }
});

test("each day lists exactly the spots and villages that belong to it", () => {
  const a = loadApp();
  const spotOnDay = a.run<(s: object, d: string) => boolean>("spotOnDay");
  for (const day of a.app.days) {
    (a.document.querySelector(`#days [data-day='${day.id}']`) as HTMLElement).click();
    const shown = [...a.document.querySelectorAll("#plan .spot-card[data-spot-index]")].map((c) => Number(c.getAttribute("data-spot-index")));
    const expected = a.app.spots.map((s, i) => (spotOnDay(s, day.id) ? i : -1)).filter((i) => i >= 0);
    expect(shown).toEqual(expected);
    const villages = [...a.document.querySelectorAll("#plan [data-village]")].map((c) => c.getAttribute("data-village"));
    expect(villages).toEqual(a.app.villages.filter((v) => ["all", "both", day.id].includes(v.day)).map((v) => v.id));
  }
});

test("both edge drawers are created once, with toggles", () => {
  const a = loadApp();
  (a.document.querySelector("#days [data-day='sat']") as HTMLElement).click();
  expect(a.document.querySelectorAll(".cat-drawer:not(.stop-edge)").length).toBe(1);
  expect(a.document.querySelectorAll("#stopDrawer.stop-edge").length).toBe(1);
  const cat = a.document.querySelector(".cat-drawer:not(.stop-edge)")!;
  (cat.querySelector(".cat-toggle") as HTMLElement).click();
  expect(cat.classList.contains("open")).toBe(true);
  (cat.querySelector(".cat-close") as HTMLElement).click();
  expect(cat.classList.contains("open")).toBe(false);
});

test("Enter on a spot card opens its Google Maps page", () => {
  const a = loadApp();
  const card = a.document.querySelector("#plan .spot-card[data-spot-index]") as HTMLElement;
  const spot = a.app.spots[Number(card.dataset.spotIndex)];
  card.dispatchEvent(new a.window.KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
  expect(a.opened).toEqual([a.run<(s: object) => string>("gmapsUrl")(spot)]);
});
