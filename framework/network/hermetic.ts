import fs from "node:fs";
import path from "node:path";
import type { BrowserContext, Route } from "@playwright/test";
import { BASE_URL, NODE_MODULES } from "../config/env";
import { COMMONS_EMPTY, DEFAULT_POIS, osrmRoute, overpassResponse, PIXEL_PNG, PoiFixture } from "../mocks";

/**
 * Every request leaves the browser through here. Known third parties are answered locally,
 * the app is passed through, and anything else is aborted and recorded, so a test never
 * depends on the real internet and a new, unmocked dependency fails loudly.
 */
export type ServiceMode = "ok" | "fail";

export interface NetworkOptions {
  leaflet: ServiceMode;
  osrm: ServiceMode;
  overpass: ServiceMode;
  pois: PoiFixture[];
}

export const DEFAULT_NETWORK: NetworkOptions = { leaflet: "ok", osrm: "ok", overpass: "ok", pois: DEFAULT_POIS };

export interface NetworkLog {
  /** Requests answered by a mock, by service name. */
  served: Record<string, number>;
  /** Requests that matched nothing and were aborted. */
  unexpected: string[];
}

const LEAFLET_CDN = /^https:\/\/(?:cdn\.jsdelivr\.net\/npm|unpkg\.com)\/(leaflet(?:\.markercluster)?)@[\d.]+\/dist\/(.+)$/;

function contentType(file: string): string {
  if (file.endsWith(".js")) return "application/javascript";
  if (file.endsWith(".css")) return "text/css";
  if (file.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

export async function installHermeticNetwork(context: BrowserContext, opts: NetworkOptions): Promise<NetworkLog> {
  const log: NetworkLog = { served: {}, unexpected: [] };
  const served = (name: string) => (log.served[name] = (log.served[name] ?? 0) + 1);

  await context.route("**/*", async (route: Route) => {
    const request = route.request();
    const url = request.url();

    if (url.startsWith(BASE_URL) || url.startsWith("data:")) return route.continue();

    const cdn = url.match(LEAFLET_CDN);
    if (cdn) {
      served("leaflet");
      if (opts.leaflet === "fail") return route.abort("failed");
      const file = path.join(NODE_MODULES, cdn[1], "dist", cdn[2]);
      if (!fs.existsSync(file)) return route.fulfill({ status: 404 });
      return route.fulfill({ body: fs.readFileSync(file), contentType: contentType(file) });
    }

    const host = new URL(url).hostname;
    if (host.endsWith("tile.openstreetmap.org")) {
      served("tiles");
      return route.fulfill({ body: PIXEL_PNG, contentType: "image/png" });
    }
    if (host === "fonts.googleapis.com" || host === "fonts.gstatic.com") {
      served("fonts");
      return route.fulfill({ body: "", contentType: "text/css" });
    }
    if (host === "router.project-osrm.org" || host === "routing.openstreetmap.de") {
      served("osrm");
      if (opts.osrm === "fail") return route.fulfill({ status: 503 });
      return route.fulfill({ json: osrmRoute(url) });
    }
    if (host === "overpass-api.de" || host === "overpass.kumi.systems") {
      served("overpass");
      if (opts.overpass === "fail") return route.fulfill({ status: 504 });
      return route.fulfill({ json: overpassResponse(opts.pois) });
    }
    if (host === "commons.wikimedia.org") {
      served("commons");
      return route.fulfill({ json: COMMONS_EMPTY });
    }
    if (request.resourceType() === "image") {
      served("images");
      return route.fulfill({ body: PIXEL_PNG, contentType: "image/png" });
    }

    log.unexpected.push(`${request.method()} ${url}`);
    return route.abort("blockedbyclient");
  });

  return log;
}
