import type { PoiFixture } from "../mocks";
import type { PoiItem } from "../utils/storage";

/** Test data builders: sensible defaults inside Mallorca, override what the test is about. */
let seq = 0;

export function aPoi(overrides: Partial<PoiFixture> = {}): PoiFixture {
  seq++;
  return { type: "fuel", lat: 39.6 + seq / 1000, lng: 2.7 + seq / 1000, name: `POI ${seq}`, ...overrides };
}

export function pois(counts: Partial<Record<PoiFixture["type"], number>>): PoiFixture[] {
  return (Object.entries(counts) as [PoiFixture["type"], number][]).flatMap(([type, n]) => Array.from({ length: n }, () => aPoi({ type })));
}

/** The shape the app stores in its POI cache (normalised fields, 5-decimal coords). */
export function toCachedItem(p: PoiFixture): PoiItem {
  return { type: p.type, lat: +p.lat.toFixed(5), lng: +p.lng.toFixed(5), name: p.name || p.brand || "", brand: p.brand ?? "", hours: p.hours ?? "", fee: p.fee ?? "" };
}

export type Stop = { n: string; c: [number, number]; type?: string; size?: string };

export function aRoute(n: number, from: [number, number] = [39.55, 2.73]): Stop[] {
  return Array.from({ length: n }, (_, i) => ({ n: `Stop ${i + 1}`, c: [+(from[0] + i / 100).toFixed(4), +(from[1] + i / 100).toFixed(4)], type: "sight", size: "small" }));
}
