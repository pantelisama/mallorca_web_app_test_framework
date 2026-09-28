import { test, expect } from "../../framework/fixtures";
import { heal } from "../../framework/healing/healer";

// The healer against the real page: a stale primary locator falls back to a working one.
const STALE = [
  { by: "testid" as const, id: "day-sat" },
  { by: "css" as const, selector: "#days [data-day='sat']" },
];

test("report mode: stale primary heals, test passes, heal is attached", async ({ planner, page }, testInfo) => {
  await planner.goto();
  const loc = await heal(page, "day button sat", STALE, { testInfo, mode: "report", timeoutMs: 200 });
  await loc.click();
  await expect(planner.heading).toHaveText(/Σάββατο/);
  expect(testInfo.annotations.filter((a) => a.type === "self-heal")).toHaveLength(1);
  const event = JSON.parse(testInfo.attachments.find((a) => a.name === "self-heal")!.body!.toString());
  expect(event).toMatchObject({ used: "css=#days [data-day='sat']", resolvedAria: '- button "Σαβ 17"', suggestion: "role=button[name=Σαβ 17]" });
});

test("strict mode: the same stale primary fails", async ({ planner, page }, testInfo) => {
  await planner.goto();
  await expect(heal(page, "day button sat", STALE, { testInfo, mode: "strict", timeoutMs: 200 })).rejects.toThrow(/strict mode/);
});
