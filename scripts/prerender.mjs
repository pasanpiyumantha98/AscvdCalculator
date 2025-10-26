// scripts/prerender.mjs
import express from "express";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Serve your built app from dist/ with SPA fallback
const distDir = path.resolve(__dirname, "../dist");
const app = express();

// Serve static assets
app.use(express.static(distDir, { extensions: ["html"] }));

// ✅ SPA fallback: use a regex or param-based wildcard (NOT "*")
app.get(/.*/, async (_req, res) => {
  res.sendFile(path.join(distDir, "index.html"));
});
// Alternative that also works:
// app.get("/:path(*)", async (_req, res) => { ... });

const PORT = 5050;
const server = await new Promise((resolve) => {
  const s = app.listen(PORT, () => {
    console.log(`Prerender server http://localhost:${PORT}`);
    resolve(s);
  });
});

// 2) Define the routes you want to prerender
const ROUTES = ["/", "/privacy-policy", "/contact-us"];

// 3) Crawl with Puppeteer and write final HTML to disk
const browser = await puppeteer.launch({ headless: "new" });
try {
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Prerendering ${url}...`);

    await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });

    const html = await page.content();

    const outDir =
      route === "/" ? distDir : path.join(distDir, route.replace(/^\//, ""));
    const outFile =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(outDir, "index.html");

    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(outFile, html, "utf8");

    console.log(`→ wrote ${outFile}`);
  }
} finally {
  await browser.close();
  server.close();
  console.log("Prerender done.");
}
