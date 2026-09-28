# Mallorca Test Framework

A production-grade **TypeScript + Playwright 1.63** test framework: hermetic, self-healing,
agentic, and wired into GitHub Actions. The system under test is a small Leaflet trip-planner
web app in [`app/`](app/) (live: https://pantelisama.github.io/mallorca_web_app_test_framework/).

| | |
|---|---|
| **Levels** | unit · integration · e2e · accessibility · performance · visual |
| **Browsers** | Chromium · Firefox · WebKit · Pixel 7 · iPhone 14 |
| **Hermetic** | zero real network: every request is mocked or fails the test |
| **Self-healing** | ordered locator candidates, heal report with ARIA snapshot + suggested fix |
| **Agentic** | Playwright planner / generator / healer agents for Claude Code |
| **CI** | PR gate · merge gate + deploy · nightly full run · CodeQL · Dependabot |

---

## Quick start

```bash
npm ci
npx playwright install --with-deps chromium   # add firefox webkit for cross-browser
npm run setup-hooks                            # pre-commit: typecheck + unit tests
npm run test:pr                                # exactly what the PR gate runs
npm run report                                 # open the HTML report
```

## Commands

| Command | Runs |
|---|---|
| `npm test` | everything, every project |
| `npm run test:pr` | typecheck + unit + integration + e2e (desktop, mobile) + a11y |
| `npm run test:smoke` | `@smoke`-tagged tests, Chromium only |
| `npm run test:unit` / `test:integration` / `test:a11y` / `test:visual` | one level |
| `npm run test:e2e` | e2e on Chromium + Pixel 7 |
| `npm run test:e2e:all` | e2e on all 5 browser projects |
| `npm run test:perf` | performance, one worker (so measurements don't compete) |
| `npm run test:nightly` | everything with `HEAL_MODE=report` |
| `npm run agent:heal` | Playwright healer agent on the failing tests |
| `npm run typecheck` | `tsc` over framework + tests |
| `npm run serve` | the app on http://127.0.0.1:4173 |

---

## Architecture

```
framework/                       the test framework (TypeScript)
├── config/
│   ├── env.ts                   paths, port, BASE_URL, HEAL_MODE — single source of truth
│   ├── budgets.ts               performance budgets
│   ├── known-issues.ts          real app bugs + known a11y violations
│   └── console-allowlist.ts     console errors a test may tolerate
├── server/static-server.ts      serves app/ exactly like GitHub Pages
├── network/hermetic.ts          routes every browser request (see Hermetic network)
├── mocks/                       OSRM, Overpass, Commons, tiles, photos
├── healing/
│   ├── healer.ts                self-healing locator
│   └── heal-reporter.ts         writes reports/self-heal-report.json
├── pages/planner.page.ts        page object; every element resolved through the healer
├── fixtures/index.ts            the `test` every spec imports
├── utils/                       clock · storage · geo · custom matchers
├── data/builders.ts             test data builders
├── perf/web-vitals.ts           LCP / CLS / TBT collector
└── unit/load-app.ts             loads app.js into jsdom for browserless unit tests

tests/
├── unit/          pure functions, data integrity, render, static checks, the healer itself
├── integration/   app + mocked services, self-healing end to end
├── e2e/           every user-facing feature + ARIA snapshots
├── a11y/          axe-core scans
├── performance/   Web Vitals against budgets
├── visual/        screenshot baselines (Linux Chromium)
└── seed.spec.ts   seed test for the Playwright agents

specs/             test plans written by the planner agent
.claude/agents/    playwright-test-planner / -generator / -healer
.github/           workflows, Dependabot, CODEOWNERS, PR + issue templates
```

## Test levels

| Level | Project(s) | What it proves |
|---|---|---|
| **Unit** | `unit` | link builders (Google Maps, directions), route leg splitting (≤10 stops/leg), day filtering, HTML escaping, POI popups, data integrity (categories, days, coordinates inside Mallorca, ratings 0–5), render output, static regressions, and the healer's own logic. Runs `app.js` in jsdom — no browser. |
| **Integration** | `integration` | the app against mocked services: OSRM route drawn, Overpass counts in the toast, weekly cache, stale-cache fallback when Overpass is down, map fallback when the Leaflet CDN is down, geolocation found / denied. |
| **E2E** | `e2e-chromium` `e2e-firefox` `e2e-webkit` `e2e-mobile` `e2e-iphone` | every user feature: day tabs, place cards, village view, category and stops drawers, swipe, map layers (fuel / market / WC / food), route toggle, navigation links, locate. Plus **ARIA snapshot** tests of the day panel, drawers and map controls. |
| **Accessibility** | `a11y` | axe-core on every day and open drawer. Known violations are listed by rule; a new one fails, and a listed one that disappears also fails (so the list stays true). |
| **Performance** | `performance` | LCP, CLS, TBT, DOMContentLoaded, day-switch time, JS heap vs `budgets.ts`. |
| **Visual** | `visual` | `toHaveScreenshot` baselines. Reviewed, never refreshed to make a test pass. |

## The `test` fixture

Every spec imports `test` and `expect` from `framework/fixtures`, and gets:

| Fixture | Does |
|---|---|
| `network` *(option)* | per-service mode: `{ leaflet, osrm, overpass: "ok" \| "fail", pois }` |
| `netLog` *(auto)* | installs the hermetic network; **fails the test** if any request was unmocked |
| `pageErrors` *(auto)* | **fails the test** on any uncaught page error or `console.error` not in the allowlist |
| `allowConsole` *(option)* | per-test console allowlist |
| `planner` | the `PlannerPage` page object, bound to the healer |

`window.open` is replaced by a recorder, so links are asserted without opening tabs.

```ts
import { test, expect } from "../../framework/fixtures";

test.use({ network: { overpass: "fail" } });

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
```

## Hermetic network

`framework/network/hermetic.ts` routes **every** request the browser makes:

| Request | Answer |
|---|---|
| the app (`127.0.0.1:4173`) | passed through |
| Leaflet + markercluster CDN | served from `node_modules` (same pinned versions) |
| OSM map tiles, remote photos | 1×1 PNG |
| Google Fonts | empty |
| OSRM routing | straight-line route through the requested stops |
| Overpass | the POI fixture (3 fuel, 2 market, 1 WC — distinct counts, so a swapped count is caught) |
| Wikimedia Commons | no photos |
| **anything else** | aborted and recorded → the test fails |

No test depends on the internet, and a new third-party dependency cannot slip in unnoticed.

## Self-healing locators

Elements are described by ordered candidates. The first is the contract; the rest are fallbacks.

```ts
poiButton(k: Poi) {
  return this.find(`poi button ${k}`, [
    { by: "role", role: "button", name: POI_LABELS[k], exact: true }, // primary: the contract
    { by: "css", selector: `[data-poi='${k}']` },                      // fallback
  ], this.page.locator(".poi-control"));
}
```

- Primary matches → nothing happens.
- Only a fallback matches → **heal**: recorded with the element's **ARIA snapshot** and a
  **suggested new primary** (a unique `getByRole`), written to `reports/self-heal-report.json`.
- Nothing matches → the test fails and lists every candidate tried.

| `HEAL_MODE` | Where | A heal… |
|---|---|---|
| `strict` *(default)* | local, PR, main | fails the test — drift is fixed, never absorbed |
| `report` | nightly | passes, and lands in the heal report for review |

## Utilities

| Utility | Use |
|---|---|
| `utils/clock.ts` | `freezeTime(page, TRIP.fri)` — fixed time on the trip days (16–19 Oct 2026) via `page.clock` |
| `utils/storage.ts` | `seedStorage`, `readStorage`, `poiCache(items, ageMs)` — seed/read the app's localStorage keys |
| `utils/geo.ts` | `setLocation(context, PLACES.palma)` — geolocation with permission |
| `utils/matchers.ts` | `expect(page).toHaveOpenedUrl(...)`, `expect(value).toBeWithinBudget(...)` |
| `data/builders.ts` | `aPoi()`, `pois({ fuel: 3 })`, `aRoute(n)` — test data builders |
| `perf/web-vitals.ts` | LCP, CLS, TBT collected with `PerformanceObserver` |
| Tags | `@smoke`, `@regression` — `npm run test:smoke` |
| Page object steps | every page-object action is a named `test.step` in the report |

## Agentic testing

Generated with `npx playwright init-agents --loop=claude`; the agents drive a real browser
through the Playwright test MCP server (`.mcp.json`), starting from `tests/seed.spec.ts`.

```
new feature ─► planner ─► specs/<feature>.md ─► review ─► generator ─► tests/e2e/*.spec.ts
nightly red ─► healer (npm run agent:heal) ─► fixed test  or  known-issues.ts entry ─► PR
```

Agents work on branches and open PRs; they never weaken an assertion or touch `app/`.

## CI/CD

| Workflow | Trigger | Runs | Heal mode |
|---|---|---|---|
| `pr.yml` | PR into `main` | typecheck, unit, integration, e2e (Chromium + Pixel 7), a11y | strict |
| `main.yml` | merge into `main` | same gate, then **deploys only `app/`** to GitHub Pages | strict |
| `nightly.yml` | 02:00 UTC + manual | all projects on all browsers, visual, performance; **opens an issue on failure** | report |
| `codeql.yml` | PR, `main`, weekly | security analysis | — |
| Dependabot | weekly | npm + actions updates (Leaflet pinned) | — |

Every run uploads `reports/` (HTML report, JSON results, heal report, traces on failure).
Performance runs nightly only until its budgets are baselined on GitHub runners.

## Quality rules

- **A test must be able to fail.** Key assertions were verified by mutation (breaking the code
  under test and watching the test go red).
- **Real app bugs are never hidden.** They live in `framework/config/known-issues.ts`, and their
  tests are `test.fail(reason)`: when the app is fixed they pass unexpectedly and get updated.
- **Baselines are reviewed**, never refreshed to make a test pass.
- **`main` is always stable**: feature branch → PR → green gate → merge. See
  [CONTRIBUTING](docs/CONTRIBUTING.md).

## Known app issues (found by this framework)

| | Issue |
|---|---|
| BUG-3 | `styles.css` hides the village panel's Google Maps, navigation and Back buttons. |
| A11y | Colour contrast: gold ratings 3.42:1, stop numbers 2.38:1, food map button 3.42:1 (4.5:1 required). |

## More

[Architecture](docs/ARCHITECTURE.md) · [Test strategy](docs/TEST_STRATEGY.md) ·
[Self-healing](docs/SELF_HEALING.md) · [Agentic](docs/AGENTIC.md) ·
[Contributing](docs/CONTRIBUTING.md) · [Security](SECURITY.md)

## License

Copyright (c) 2026 Pantelis Pantelidis. All rights reserved. See [LICENSE](LICENSE).
