# Test strategy

| Level | Project(s) | Proves | PR | Main | Nightly |
|---|---|---|:-:|:-:|:-:|
| Unit | `unit` | link builders, leg splitting, day filtering, escaping, data integrity, render output, healer logic | ✅ | ✅ | ✅ |
| Integration | `integration` | the app against mocked services: OSRM route, Overpass counts + cache + stale-cache fallback, Leaflet-missing fallback, geolocation found/denied | ✅ | ✅ | ✅ |
| E2E | `e2e-chromium`, `e2e-mobile` | every user-facing feature in a real browser | ✅ | ✅ | ✅ |
| E2E cross-browser | `e2e-firefox`, `e2e-webkit`, `e2e-iphone` | the same features on Gecko and WebKit | | | ✅ |
| Accessibility | `a11y` | axe-core rules; known violations listed by rule id | ✅ | ✅ | ✅ |
| Performance | `performance` | budgets in `framework/config/budgets.ts` (nightly only until baselined on GitHub runners) | | | ✅ |
| Visual | `visual` | screenshot baselines | | | ✅ |

## Pipelines

- **`pr.yml`**: every PR into `main`. Fast gate; `HEAL_MODE=strict`, so a locator that had to
  heal fails the PR.
- **`main.yml`**: every merge into `main`. Full gate (performance excluded for now), then deploys **only `app/`** to GitHub Pages.
  A red gate means no deploy.
- **`nightly.yml`**: 02:00 UTC + manual. Everything on every browser; `HEAL_MODE=report`, so heals
  pass and are listed in `reports/self-heal-report.json`.

## Rules

- A test must be able to fail. Key assertions were checked by mutating the code under test.
- Baselines (visual) are reviewed, never refreshed to make a test pass.
- Never widen a test to pass over a known app bug; use `test.fail` with the entry from
  `known-issues.ts`.

## Running locally

```bash
npm ci && npx playwright install --with-deps chromium
npm run test:pr        # what the PR gate runs
npm test               # everything
npm run report         # open the HTML report
```
