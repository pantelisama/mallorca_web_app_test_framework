import type { Page } from "@playwright/test";

/** The trip: 16–19 Oct 2026, Europe/Madrid (UTC+2 in October). */
export const TRIP = {
  fri: new Date("2026-10-16T09:00:00+02:00"),
  sat: new Date("2026-10-17T09:00:00+02:00"),
  sun: new Date("2026-10-18T09:00:00+02:00"),
  mon: new Date("2026-10-19T09:00:00+02:00"),
} as const;

/** Freezes Date.now/new Date at `at` (timers still run), so time-based logic like the weekly POI cache is deterministic. */
export async function freezeTime(page: Page, at: Date = TRIP.fri): Promise<void> {
  await page.clock.setFixedTime(at);
}
