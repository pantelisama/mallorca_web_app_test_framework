/**
 * Canned responses for every third-party service the app calls. Shapes mirror the real APIs
 * closely enough for the app's parsers; anything the app does not read is left out.
 */

/** A 1x1 transparent PNG, used for map tiles and remote photos. */
export const PIXEL_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

export type LatLng = [number, number];

/** OSRM /route/v1/driving response: a straight line through the requested waypoints. */
export function osrmRoute(requestUrl: string) {
  const coords = decodeURIComponent(new URL(requestUrl).pathname.split("/").pop() ?? "")
    .split(";")
    .map((pair) => pair.split(",").map(Number));
  return { code: "Ok", routes: [{ geometry: { type: "LineString", coordinates: coords } }] };
}

export interface PoiFixture {
  type: "fuel" | "market" | "wc";
  lat: number;
  lng: number;
  name?: string;
  brand?: string;
  hours?: string;
  fee?: string;
}

/** Island-wide POIs the Overpass mock returns: 3 fuel, 2 market, 1 wc. Distinct counts, so a count shown under the wrong kind is caught. */
export const DEFAULT_POIS: PoiFixture[] = [
  { type: "fuel", lat: 39.62994, lng: 2.66407, name: "Repsol", hours: "07:00-22:00" },
  { type: "fuel", lat: 39.71278, lng: 2.69028, name: "Moeve", brand: "Cepsa" },
  { type: "fuel", lat: 39.8412, lng: 3.1315, brand: "Galp" },
  { type: "market", lat: 39.5712, lng: 2.6501, name: "Mercadona" },
  { type: "market", lat: 39.8525, lng: 3.1192, name: "Eroski" },
  { type: "wc", lat: 39.7671, lng: 2.7158, fee: "no" },
];

const OSM_TAGS: Record<PoiFixture["type"], Record<string, string>> = {
  fuel: { amenity: "fuel" },
  market: { shop: "supermarket" },
  wc: { amenity: "toilets" },
};

/** Overpass /api/interpreter response for the given POIs. */
export function overpassResponse(pois: PoiFixture[] = DEFAULT_POIS) {
  return {
    elements: pois.map((p, i) => ({
      type: "node",
      id: i + 1,
      lat: p.lat,
      lon: p.lng,
      tags: {
        ...OSM_TAGS[p.type],
        ...(p.name ? { name: p.name } : {}),
        ...(p.brand ? { brand: p.brand } : {}),
        ...(p.hours ? { opening_hours: p.hours } : {}),
        ...(p.fee ? { fee: p.fee } : {}),
      },
    })),
  };
}

/** Wikimedia Commons geosearch: no photos, so the app keeps its fallback images. */
export const COMMONS_EMPTY = { query: { pages: {} } };
