import type { BrowserContext } from "@playwright/test";

export const PLACES = { palma: { latitude: 39.5696, longitude: 2.6502 }, alcudia: { latitude: 39.8525, longitude: 3.1192 } } as const;

/** Grants geolocation and moves the device; call again to move. */
export async function setLocation(context: BrowserContext, at: { latitude: number; longitude: number }): Promise<void> {
  await context.grantPermissions(["geolocation"]);
  await context.setGeolocation(at);
}
