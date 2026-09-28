import { test, expect } from "../../framework/fixtures";
import { BUDGETS } from "../../framework/config/budgets";
import { installVitals, readVitals } from "../../framework/perf/web-vitals";

test("load: LCP, CLS, TBT and DOMContentLoaded within budget", async ({ planner, page }, testInfo) => {
  await installVitals(page);
  await planner.goto();
  const v = await readVitals(page);
  if (process.env.PERF_DEBUG) console.log(JSON.stringify(v), await page.evaluate(() => { const e = performance.getEntriesByType("largest-contentful-paint").at(-1) as any; return e ? `${e.element?.tagName}.${e.element?.className} ${e.url}` : "none"; }));
  await testInfo.attach("vitals", { body: JSON.stringify(v), contentType: "application/json" });
  expect(v.lcp, "LCP ms").toBeGreaterThan(0);
  expect.soft(v.lcp).toBeWithinBudget(BUDGETS.lcpMs, "LCP ms");
  expect.soft(v.cls).toBeWithinBudget(BUDGETS.cls, "CLS");
  expect.soft(v.tbt).toBeWithinBudget(BUDGETS.tbtMs, "TBT ms");
  expect.soft(v.dcl).toBeWithinBudget(BUDGETS.domContentLoadedMs, "DCL ms");
});

test("switching day re-renders within budget", async ({ planner, page }, testInfo) => {
  await planner.goto();
  const timings: number[] = [];
  for (const day of ["sat", "sun", "mon", "fri"]) {
    timings.push(
      await page.evaluate((d) => {
        const b = document.querySelector<HTMLElement>(`#days [data-day='${d}']`)!;
        const t0 = performance.now();
        b.click(); // render() is synchronous
        return performance.now() - t0;
      }, day),
    );
  }
  await testInfo.attach("day-switch-ms", { body: JSON.stringify(timings), contentType: "application/json" });
  expect(Math.max(...timings)).toBeWithinBudget(BUDGETS.daySwitchMs, "day switch ms");
});

test("JS heap after load within budget (CDP)", async ({ planner, page, browserName }, testInfo) => {
  test.skip(browserName !== "chromium", "CDP heap metrics are Chromium-only");
  await planner.goto();
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("HeapProfiler.collectGarbage");
  const { usedSize } = await cdp.send("Runtime.getHeapUsage");
  const mb = usedSize / 1024 / 1024;
  await testInfo.attach("heap-mb", { body: String(mb), contentType: "text/plain" });
  expect(mb).toBeWithinBudget(BUDGETS.jsHeapMb, "heap MB");
});
