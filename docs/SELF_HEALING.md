# Self-healing locators

Every element in the page objects is described by ordered candidates:

```ts
this.find("route button", [
  { by: "role", role: "button", name: "Εμφάνιση διαδρομής" }, // primary: the contract
  { by: "css", selector: ".route-action" },                    // fallback
]);
```

- The **first** candidate is the contract. If it matches, nothing happens.
- If only a **fallback** matches, that is a **heal**: the event is attached to the test
  (`self-heal`) and collected by `framework/healing/heal-reporter.ts` into
  `reports/self-heal-report.json` (always written, empty when nothing healed).
- If **nothing** matches, the test fails and the error lists every candidate that was tried.

## Modes (`HEAL_MODE`)

| Mode | Used by | A heal… |
|---|---|---|
| `strict` (default) | PR + main pipelines, local runs | fails the test, so the drift is fixed in the primary candidate |
| `report` | nightly | passes and is reported for review |

This keeps the gates honest (a change of markup is never silently absorbed) while the nightly run
still completes and tells you exactly which locators drifted and what they healed to.

The healer is unit-tested, including that strict mode really fails on a heal.

## What a heal event records

Each entry in `reports/self-heal-report.json` has: the element, the test, the primary candidate,
the candidate that won, the **ARIA snapshot of what it healed to**, and a **suggested new
primary** (a `getByRole` that matches that element uniquely), so the fix is a copy-paste.

Note: passing `--reporter` on the command line replaces the configured reporters and the heal
report is not written. The pipelines never pass it.

## Repairing with the agent

`npm run agent:heal` asks the Playwright healer agent to fix the failing tests in
`reports/results.json` without touching `app/` or tests marked as known app bugs.
