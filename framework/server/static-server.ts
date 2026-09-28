import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { APP_DIR, PORT } from "../config/env";

/** Serves app/ exactly as GitHub Pages does: static files, index.html for directories, 404 otherwise. */
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  let file = path.normalize(path.join(APP_DIR, urlPath));
  if (!file.startsWith(APP_DIR)) {
    res.writeHead(403).end();
    return;
  }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) {
    res.writeHead(404).end("Not found");
    return;
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => console.log(`Serving ${APP_DIR} at http://127.0.0.1:${PORT}`));
