import AxeBuilder from "@axe-core/playwright";
import type { Page, TestInfo } from "@playwright/test";
import { test, expect } from "../../framework/fixtures";
import { KNOWN_A11Y } from "../../framework/config/known-issues";

/** WCAG 2.1 A/AA scan; returns every violating node as "rule target". Full results are attached. */
async function scan(page: Page, testInfo: TestInfo): Promise<{ rule: string; target: string }[]> {
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  await testInfo.attach("axe-violations", { body: JSON.stringify(r.violations, null, 2), contentType: "application/json" });
  return r.violations.flatMap((v) => v.nodes.map((n) => ({ rule: v.id, target: n.target.join(" ") })));
}

const known = (v: { rule: string; target: string }) => KNOWN_A11Y.some((k) => k.rule === v.rule && k.target.test(v.target));

test("planner on load: only the documented violations", async ({ planner, page }, testInfo) => {
  await planner.goto();
  const found = await scan(page, testInfo);
  expect(found.filter((v) => !known(v)), "new a11y violations").toEqual([]);
  // Every documented issue is still real; when one is fixed, remove it from KNOWN_A11Y.
  for (const k of KNOWN_A11Y) expect(found.some((v) => v.rule === k.rule && k.target.test(v.target)), k.why).toBe(true);
});

test("other days and open drawers: no undocumented violations", async ({ planner, page }, testInfo) => {
  await planner.goto();
  for (const day of ["sat", "sun", "mon"] as const) {
    await planner.selectDay(day);
    expect((await scan(page, testInfo)).filter((v) => !known(v)), `new a11y violations on ${day}`).toEqual([]);
  }
  await planner.swipe(planner.catDrawer, 80);
  await planner.swipe(planner.stopDrawer, -80);
  expect((await scan(page, testInfo)).filter((v) => !known(v)), "new a11y violations with drawers open").toEqual([]);
});
