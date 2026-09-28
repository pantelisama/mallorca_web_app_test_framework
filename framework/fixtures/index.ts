import { test as base } from "@playwright/test";
import { DEFAULT_NETWORK, installHermeticNetwork, NetworkLog, NetworkOptions } from "../network/hermetic";
import { PlannerPage } from "../pages/planner.page";
import { CONSOLE_ALLOWLIST } from "../config/console-allowlist";
import { expect } from "../utils/matchers";

/**
 * Every browser test runs behind the hermetic network, with a recording window.open and a
 * console guard. At teardown a test fails on any request no mock answered, and on any uncaught
 * page error or console.error not in CONSOLE_ALLOWLIST. Plumbing fixtures are boxed so a failure
 * points at the test line, not at this file.
 */
export const test = base.extend<{ network: NetworkOptions; allowConsole: RegExp[]; netLog: NetworkLog; pageErrors: string[]; planner: PlannerPage }>({
  network: [DEFAULT_NETWORK, { option: true }],
  /** Per-test console.error patterns, for tests that deliberately break a service. */
  allowConsole: [[], { option: true }],

  netLog: [
    async ({ context, network }, use) => {
      const log = await installHermeticNetwork(context, network);
      await context.addInitScript(() => {
        const w = window as unknown as { __opened: string[] };
        w.__opened = [];
        window.open = ((url?: string | URL) => {
          w.__opened.push(String(url));
          return null;
        }) as typeof window.open;
      });
      await use(log);
      expect(log.unexpected, "requests that no mock answers").toEqual([]);
    },
    { auto: true, box: true },
  ],

  pageErrors: [
    async ({ page, allowConsole }, use) => {
      const errors: string[] = [];
      const allowed = (m: string) => CONSOLE_ALLOWLIST.some((a) => a.pattern.test(m)) || allowConsole.some((p) => p.test(m));
      page.on("pageerror", (e) => allowed(e.message) || errors.push(`pageerror: ${e.message}`));
      page.on("console", (m) => m.type() === "error" && !allowed(m.text()) && errors.push(`console.error: ${m.text()}`));
      await use(errors);
      expect(errors, "uncaught page errors / console.error").toEqual([]);
    },
    { auto: true, box: true },
  ],

  planner: async ({ page }, use, testInfo) => {
    await use(new PlannerPage(page, testInfo));
  },
});

export { expect };
