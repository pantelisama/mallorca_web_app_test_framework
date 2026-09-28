/**
 * Real app defects found by this suite. Tests that hit them are marked test.fail(reason), so
 * they stay red-by-design: when the app is fixed they "unexpectedly pass" and must be updated.
 * Never widen a test to make one of these pass.
 */
export const APP_BUGS = {
  villageToolsHidden:
    "BUG-3: `.day-panel .day-tools{display:none!important}` (styles.css:251,267) hides the village panel's Google Maps, 🧭 Πλοήγηση and Back controls.",
} as const;

/**
 * Accessibility violations the app has today (axe, WCAG 2.1 A/AA). The a11y tests fail on any
 * violation not listed here, and on any listed one that has disappeared (so this list stays true).
 */
export const KNOWN_A11Y: { rule: string; target: RegExp; why: string }[] = [
  { rule: "color-contrast", target: /\.spot-rating > \.stars$/, why: "gold ★ rating #b7802a on white: 3.42:1 (needs 4.5:1)" },
  { rule: "color-contrast", target: /\[data-stop-index="\d+"\] > \.cat-icon$/, why: "stop numbers #9daaae on white: 2.38:1" },
  { rule: "color-contrast", target: /\[data-poi="food"\] > b$/, why: "white label on #b7802a food map button: 3.42:1" },
];
