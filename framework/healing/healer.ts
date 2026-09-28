import type { Locator, Page, TestInfo } from "@playwright/test";
import path from "node:path";
import { HEAL_MODE, HealMode, ROOT } from "../config/env";

/**
 * Self-healing locator: an element is described by ordered candidate strategies. The first
 * candidate is the contract; later ones are fallbacks. The first candidate that matches wins.
 * Using a fallback is a heal: it is recorded, and in strict mode it fails the test, so drift
 * is fixed in the primary candidate rather than silently absorbed.
 */
export type Candidate =
  | { by: "role"; role: Parameters<Page["getByRole"]>[0]; name?: string | RegExp; exact?: boolean }
  | { by: "testid"; id: string }
  | { by: "text"; text: string | RegExp; exact?: boolean }
  | { by: "css"; selector: string };

/** The subset of Page/Locator the healer needs, so it is unit-testable without a browser. */
export interface Root {
  getByRole(role: any, options?: { name?: string | RegExp; exact?: boolean }): Locator;
  getByTestId(id: string): Locator;
  getByText(text: string | RegExp, options?: { exact?: boolean }): Locator;
  locator(selector: string): Locator;
}

export interface HealEvent {
  element: string;
  test: string;
  file: string;
  primary: string;
  used: string;
  usedIndex: number;
  mode: HealMode;
  /** ARIA snapshot of the element the fallback resolved to: what the test actually healed to. */
  resolvedAria: string;
  /** A role+name locator that uniquely matches the healed element, proposed as the new primary. */
  suggestion: string | null;
}

export const HEAL_ATTACHMENT = "self-heal";

export class HealError extends Error {}

export function describe(c: Candidate): string {
  switch (c.by) {
    case "role": return `role=${c.role}${c.name !== undefined ? `[name=${String(c.name)}]` : ""}`;
    case "testid": return `testid=${c.id}`;
    case "text": return `text=${String(c.text)}`;
    case "css": return `css=${c.selector}`;
  }
}

function build(root: Root, c: Candidate): Locator {
  switch (c.by) {
    case "role": return root.getByRole(c.role, { name: c.name, exact: c.exact });
    case "testid": return root.getByTestId(c.id);
    case "text": return root.getByText(c.text, { exact: c.exact });
    case "css": return root.locator(c.selector);
  }
}

export interface HealOptions {
  testInfo: TestInfo;
  mode?: HealMode;
  /** How long to wait for the primary candidate before trying fallbacks. */
  timeoutMs?: number;
}

/** Resolves `element` to a Locator. Throws HealError when nothing matches, or on a heal in strict mode. */
export async function heal(root: Root, element: string, candidates: Candidate[], opts: HealOptions): Promise<Locator> {
  if (candidates.length === 0) throw new HealError(`${element}: no candidates given`);
  const mode = opts.mode ?? HEAL_MODE;
  const tried: string[] = [];

  // Give the primary candidate time to appear; fallbacks are checked immediately after.
  const primary = build(root, candidates[0]);
  try {
    await primary.first().waitFor({ state: "attached", timeout: opts.timeoutMs ?? 5000 });
  } catch {
    /* fall through to the ordered scan */
  }

  for (const [i, c] of candidates.entries()) {
    const loc = i === 0 ? primary : build(root, c);
    const n = await loc.count();
    tried.push(`${describe(c)} -> ${n}`);
    if (n === 0) continue;
    if (i > 0) {
      const { aria, suggestion } = await inspect(root, loc.first());
      await record(opts.testInfo, { element, primary: describe(candidates[0]), used: describe(c), usedIndex: i, mode, resolvedAria: aria, suggestion });
    }
    return loc;
  }
  throw new HealError(`${element}: no candidate matched. Tried:\n  ${tried.join("\n  ")}`);
}

/** Parses the healed element's ARIA snapshot into a role+name candidate, kept only if it is unique. */
export async function inspect(root: Root, el: Locator): Promise<{ aria: string; suggestion: string | null }> {
  const aria = await el.ariaSnapshot().catch(() => "");
  const m = aria.split("\n")[0].match(/^- (\w+) "(.+?)"/);
  if (!m) return { aria, suggestion: null };
  const [, role, name] = m;
  const unique = (await root.getByRole(role, { name, exact: true }).count()) === 1;
  return { aria, suggestion: unique ? describe({ by: "role", role: role as never, name, exact: true }) : null };
}

async function record(testInfo: TestInfo, e: Omit<HealEvent, "test" | "file">): Promise<void> {
  const event: HealEvent = { ...e, test: testInfo.titlePath.join(" > "), file: path.relative(ROOT, testInfo.file) };
  const description = `${event.element}: ${event.primary} failed, healed with ${event.used}`;
  testInfo.annotations.push({ type: HEAL_ATTACHMENT, description });
  await testInfo.attach(HEAL_ATTACHMENT, { body: JSON.stringify(event), contentType: "application/json" });
  if (e.mode === "strict") throw new HealError(`Self-heal in strict mode: ${description}. Fix the primary locator.`);
}
