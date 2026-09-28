# Architecture

```
app/                  the web app, deployed as-is to GitHub Pages
framework/            TypeScript test framework
  config/             env (paths, port, HEAL_MODE), performance budgets, known app bugs
  server/             static server that serves app/ like GitHub Pages
  network/            hermetic network: every browser request is answered locally or fails the test
  mocks/              canned OSRM, Overpass, Commons, tiles and photo responses
  healing/            self-healing locator + reporter (docs/SELF_HEALING.md)
  pages/              page objects (PlannerPage); every element resolved through the healer
  fixtures/           test = base.extend(...): hermetic network, window.open recorder, page object
  unit/               loads app.js into jsdom for browserless unit tests
  utils/              clock (fixed trip time), storage (localStorage seed/read), geo, custom matchers
  data/               test data builders (POIs, routes)
  perf/               Web Vitals collector (LCP, CLS, TBT) used by tests/performance
tests/
  unit/               pure functions, data integrity, render, static checks, the healer itself
  integration/        app + mocked services: caching, failures, fallbacks, geolocation
  e2e/                every user-facing feature, desktop + mobile, cross-browser
  a11y/               axe-core scan per day and per open drawer
  performance/        LCP, CLS, TBT, DCL, day-switch time, JS heap against framework/config/budgets.ts
  visual/             screenshot baselines (Linux)
  seed.spec.ts        seed for the Playwright agents (docs/AGENTIC.md)
specs/                test plans written by the planner agent
.claude/agents/       Playwright planner / generator / healer agents
.github/workflows/    pr.yml · main.yml · nightly.yml
agent/                backend for the "+ Add" button (docs only for now)
archive/              old release bundle, not deployed
```

## Design rules

- **Hermetic.** No test touches the real internet. Leaflet is served from `node_modules`, every
  third-party API is mocked, and any unmocked request fails the test (`log.unexpected`).
- **Deterministic.** `window.open` is recorded instead of opening tabs; geolocation comes from
  the browser context; time zone and locale are fixed in `playwright.config.ts`.
- **Fail on page errors.** The fixture fails a test on any uncaught page error or
  `console.error`, except entries in `framework/config/console-allowlist.ts`.
- **One source of truth.** Paths, port and heal mode live in `framework/config/env.ts`; budgets
  in `budgets.ts`; known app bugs in `known-issues.ts`.
- **The app is tested as it is.** Real defects are recorded in `known-issues.ts` and their tests
  are `test.fail(reason)`: when the app is fixed they pass unexpectedly and must be updated.
