import type { Page } from "@playwright/test";

/** Init script: records LCP, CLS and long tasks from page start via PerformanceObserver. */
export async function installVitals(page: Page): Promise<void> {
  await page.addInitScript(() => {
    const v = { lcp: 0, cls: 0, tbt: 0 };
    (window as unknown as { __vitals: typeof v }).__vitals = v;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (v.lcp = e.startTime))).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((l) =>
      l.getEntries().forEach((e) => {
        const s = e as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!s.hadRecentInput) v.cls += s.value;
      }),
    ).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (v.tbt += Math.max(0, e.duration - 50)))).observe({ type: "longtask", buffered: true });
  });
}

export interface Vitals { lcp: number; cls: number; tbt: number; dcl: number }

export async function readVitals(page: Page): Promise<Vitals> {
  await page.waitForLoadState("load");
  // LCP is final once the page has been idle; poll until it stops changing.
  let last = -1;
  for (let i = 0; i < 20; i++) {
    const lcp = await page.evaluate(() => (window as unknown as { __vitals: { lcp: number } }).__vitals.lcp);
    if (lcp > 0 && lcp === last) break;
    last = lcp;
    await page.waitForTimeout(100);
  }
  return page.evaluate(() => {
    const v = (window as unknown as { __vitals: { lcp: number; cls: number; tbt: number } }).__vitals;
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    return { ...v, dcl: nav.domContentLoadedEventEnd };
  });
}
