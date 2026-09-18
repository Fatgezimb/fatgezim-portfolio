import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";

const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");
const output = resolve(process.env.PAGES_OUTPUT ?? "pages-dist");
const routes = ["/", "/research", "/research/george-mason-neuronal-reconstruction", "/resume"];
const server = process.env.PAGES_SERVER;

if (basePath && !/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(basePath)) {
  throw new Error("PAGES_BASE_PATH must be a path such as /fatgezim-portfolio");
}
if (!output.startsWith(`${process.cwd()}${sep}`) || /^(?:app|public|scripts|dist|node_modules|\.git|\.github)(?:\/|$)/.test(output.slice(process.cwd().length + 1))) {
  throw new Error("PAGES_OUTPUT must be a dedicated export directory inside the project");
}

// Use the built worker directly, as the render tests do. Exporting does not
// require a background HTTP server or a second build.
const worker = server ? null : (await import(pathToFileURL(resolve("dist/server/index.js")).href)).default;
async function render(route) {
  const request = new Request(new URL(`${basePath}${route}`, server ?? "http://localhost"));
  const response = server
    ? await fetch(request)
    : await worker.fetch(request, {
        ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
      }, { waitUntil() {}, passThroughOnException() {} });
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  return response.text();
}

await rm(output, { recursive: true, force: true });
await cp("dist/client", output, { recursive: true });
for (const route of routes) {
  const html = await render(route);
  const directory = route === "/" ? output : join(output, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, "index.html"), html);
}

for (const route of ["/robots.txt", "/sitemap.xml"]) {
  await writeFile(join(output, route.slice(1)), await render(route));
}
await writeFile(join(output, ".nojekyll"), "");
await writeFile(join(output, "404.html"), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | Fatgezim Bela</title><style>body{font-family:system-ui,sans-serif;background:#f4f8f6;color:#163e35;max-width:40rem;padding:15vh 1.5rem;margin:auto}a{color:inherit;text-underline-offset:.2em}h1{font-size:clamp(2rem,6vw,4rem)}</style></head><body><main><p>404</p><h1>Page not found.</h1><p><a href="${basePath}/">Return to Fatgezim Bela’s portfolio</a></p></main></body></html>`);

// Catch root-relative paths before publishing. Do not rewrite HTML: that would
// leave React's hydration data and later client interactions pointing elsewhere.
async function checkUrls(label, urls) {
  for (const url of urls) {
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    if (basePath && url !== basePath && !url.startsWith(`${basePath}/`)) {
      throw new Error(`${label} contains a URL outside PAGES_BASE_PATH: ${url}`);
    }
    const pathname = new URL(url, "http://localhost").pathname.slice(basePath.length);
    const target = resolve(output, `.${decodeURIComponent(pathname)}`);
    if (!target.startsWith(`${output}${sep}`) && target !== output) {
      throw new Error(`${label} contains a URL outside the export: ${url}`);
    }
    let file;
    try {
      file = await stat(target);
      if (file.isDirectory()) file = await stat(join(target, "index.html"));
    } catch {
      throw new Error(`${label} points to a missing static file: ${url}`);
    }
    if (!file.isFile()) throw new Error(`${label} points to a non-file: ${url}`);
  }
}

function cssUrls(source) {
  return [...source.matchAll(/url\(\s*["']?([^\s)"']+)/g)].map((match) => match[1]);
}
for (const route of routes) {
  const html = await readFile(join(output, route.slice(1), "index.html"), "utf8");
  const urls = [...html.matchAll(/\b(?:href|src|action|poster|data-src|data-poster)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const [, srcset] of html.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    urls.push(...srcset.split(",").map((candidate) => candidate.trim().split(/\s+/)[0]));
  }
  await checkUrls(route, [...urls, ...cssUrls(html)]);
}
for (const filename of await readdir(output, { recursive: true })) {
  if (filename.endsWith(".css")) {
    await checkUrls(filename, cssUrls(await readFile(join(output, filename), "utf8")));
  }
}

console.log(`Exported and checked ${routes.length} routes plus crawler files to ${output}`);
