import path from "node:path";

/** Single source of truth for paths and switches shared by the config, the server and the fixtures. */
export const ROOT = path.resolve(__dirname, "..", "..");
export const APP_DIR = path.join(ROOT, "app");
export const NODE_MODULES = path.join(ROOT, "node_modules");

export const PORT = Number(process.env.APP_PORT ?? 4173);
export const BASE_URL = process.env.BASE_URL ?? `http://127.0.0.1:${PORT}`;

/**
 * Self-healing policy.
 *  - strict: a healed locator fails the test (PR and merge gates: drift gets fixed, not hidden).
 *  - report: a healed locator passes and is written to the heal report (nightly).
 */
export type HealMode = "strict" | "report";
export const HEAL_MODE: HealMode = process.env.HEAL_MODE === "report" ? "report" : "strict";

export const IS_CI = !!process.env.CI;
