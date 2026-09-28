/** console.error / pageerror messages a test may see without failing. Each entry needs a reason. */
export const CONSOLE_ALLOWLIST: { pattern: RegExp; reason: string }[] = [
  // The hermetic network aborts nothing the app needs; aborted requests would surface here.
];
