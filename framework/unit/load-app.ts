import fs from "node:fs";
import path from "node:path";
import { JSDOM } from "jsdom";
import { APP_DIR } from "../config/env";

export const APP_JS = fs.readFileSync(path.join(APP_DIR, "app.js"), "utf8");
export const INDEX_HTML = fs.readFileSync(path.join(APP_DIR, "index.html"), "utf8");
export const STYLES_CSS = fs.readFileSync(path.join(APP_DIR, "styles.css"), "utf8");

/** App-level consts the unit tests read. Functions are globals already. */
const EXPORTED = ["categories", "spots", "villages", "days", "routes", "POI_TYPES", "OSM_TYPES", "MALLORCA_BBOX"];

export interface AppData {
  categories: Record<string, { label: string; icon: string }>;
  spots: Array<{ n: string; c: [number, number]; cat: string; day?: string | string[]; rating?: number; reviews?: number; id?: string; q?: string }>;
  villages: Array<{ id: string; name: string; gid: string; c: [number, number]; day: string; data: { rating: number | null } }>;
  days: Array<{ id: string; label: string; title: string; sub: string; plan: Array<[string, string, string, string, string]> }>;
  routes: Record<string, { stops: Array<{ n: string; c: [number, number]; type: string; size: string }> }>;
  POI_TYPES: Record<string, { label: string; icon: string; test?: unknown }>;
  OSM_TYPES: string[];
  MALLORCA_BBOX: string;
  currentDay: string;
}

export interface LoadedApp {
  window: JSDOM["window"];
  document: Document;
  /** Evaluates an expression in the app's global scope (top-level consts and functions included). */
  app: AppData;
  run<T = unknown>(expr: string): T;
  /** window.open calls made by the app. */
  opened: string[];
}

/**
 * Loads app.js into the real index.html shell, with its <script> tags stripped so nothing is
 * fetched. Leaflet is absent unless `leaflet` is given, so this exercises the no-map path.
 */
export function loadApp(opts: { source?: string } = {}): LoadedApp {
  const html = INDEX_HTML.replace(/<script[\s\S]*?<\/script>/g, "");
  const dom = new JSDOM(html, { runScripts: "outside-only", url: "http://127.0.0.1/" });
  const opened: string[] = [];
  dom.window.open = ((url?: string | URL) => {
    opened.push(String(url));
    return null;
  }) as typeof dom.window.open;
  // Top-level consts live in the eval's own lexical scope, so the same eval re-exports them.
  dom.window.eval(`${opts.source ?? APP_JS}\n;window.__app={${EXPORTED.join(",")},get currentDay(){return currentDay;}};`);
  return {
    window: dom.window,
    document: dom.window.document,
    app: (dom.window as unknown as { __app: AppData }).__app,
    run: <T>(expr: string) => dom.window.eval(expr) as T,
    opened,
  };
}
