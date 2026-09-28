import { expect as base, Page } from "@playwright/test";

/** Custom matchers: the window.open recorder and performance budgets. */
export const expect = base.extend({
  async toHaveOpenedUrl(page: Page, expected: string | RegExp, options: { timeout?: number } = {}) {
    let opened: string[] = [];
    let pass = false;
    try {
      await base
        .poll(async () => (opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened)), { timeout: options.timeout ?? 5000 })
        .toContainEqual(typeof expected === "string" ? expected : base.stringMatching(expected));
      pass = true;
    } catch {
      pass = false;
    }
    if (this.isNot) pass = opened.some((u) => (typeof expected === "string" ? u === expected : expected.test(u)));
    return {
      pass,
      name: "toHaveOpenedUrl",
      message: () => `expected window.open ${this.isNot ? "not " : ""}to be called with ${expected}\nopened: ${JSON.stringify(opened, null, 2)}`,
    };
  },

  toBeWithinBudget(actual: number, budget: number, label = "value") {
    const pass = Number.isFinite(actual) && actual <= budget;
    return { pass, name: "toBeWithinBudget", message: () => `${label}: ${actual} ${pass ? "<=" : ">"} budget ${budget}` };
  },
});
