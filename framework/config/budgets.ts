/**
 * Performance budgets, measured on a hermetic run (no real network), so they describe the app
 * itself rather than third-party latency.
 */
export const BUDGETS = {
  /** Largest Contentful Paint, ms. */
  lcpMs: 2500,
  /** Cumulative Layout Shift, unitless. */
  cls: 0.1,
  /** Total Blocking Time (long-task time above 50 ms), ms. */
  tbtMs: 300,
  /** DOMContentLoaded from navigation start, ms. */
  domContentLoadedMs: 1500,
  /** Switching day re-renders the plan and must feel instant, ms. */
  daySwitchMs: 200,
  /** JS heap after load, MB (Chromium only). */
  jsHeapMb: 60,
} as const;
