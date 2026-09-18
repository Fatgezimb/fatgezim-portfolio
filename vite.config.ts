import vinext from "vinext";
import { defineConfig } from "vite";
import hostingConfig from "./.openai/hosting.json";
import { sites } from "./build/sites-vite-plugin";

const SITE_CREATOR_PLACEHOLDER_DATABASE_ID =
  "00000000-0000-4000-8000-000000000000";

const { d1, r2 } = hostingConfig;

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const pagesBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

const localBindingConfig = {
  main: "./worker/index.ts",
  compatibility_flags: ["nodejs_compat"],
  d1_databases: d1
    ? [
        {
          binding: d1,
          database_name: "site-creator-d1",
          database_id: SITE_CREATOR_PLACEHOLDER_DATABASE_ID,
        },
      ]
    : [],
  r2_buckets: r2
    ? [
        {
          binding: r2,
          bucket_name: "site-creator-r2",
        },
      ]
    : [],
};

export default defineConfig(async () => {
  // Keep Wrangler and Miniflare state project-local. These are non-secret tool
  // settings; application environment belongs in ignored `.env*` files.
  process.env.WRANGLER_WRITE_LOGS ??= "false";
  process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
  process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

  // Wrangler snapshots its log path while the Cloudflare plugin is imported.
  const { cloudflare } = await import("@cloudflare/vite-plugin");

  return {
    server: isCodexSeatbeltSandbox
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
    plugins: [
      vinext(),
      {
        name: "pages-font-base-path",
        enforce: "post",
        // Vinext 0.0.50's Google font transform embeds root-relative font URLs
        // in JavaScript strings. Apply the base before SSR/hydration so font
        // preloads and generated @font-face rules agree in every environment.
        transform(code: string) {
          if (!pagesBasePath || !code.includes("_selfHostedCSS")) return;
          return {
            code: code.replaceAll("url(/assets/_vinext_fonts/", `url(${pagesBasePath}/assets/_vinext_fonts/`),
            map: null,
          };
        },
      },
      {
        name: "pages-static-history",
        enforce: "pre",
        // Native anchor changes emit popstate too. A static Pages deployment
        // has no RSC endpoint: preserve browser history/scroll behavior and
        // load another document only when its path or query actually changes.
        transform(code: string, id: string) {
          if (!pagesBasePath || !id.endsWith("/vinext/dist/server/app-browser-entry.js")) return;
          const original = /\tif \("scrollRestoration" in history\) history\.scrollRestoration = "manual";\n\twindow\.addEventListener\("popstate", \(event\) => \{[\s\S]*?\n\t\}\);/;
          if (!original.test(code)) {
            throw new Error("Review the Pages history adapter for this Vinext version.");
          }
          return {
            code: code.replace(original, `
  const pagesDocumentPath = window.location.pathname + window.location.search;
  if ("scrollRestoration" in history) history.scrollRestoration = "auto";
  window.addEventListener("popstate", () => {
    if (window.location.pathname + window.location.search !== pagesDocumentPath) {
      window.location.reload();
      return;
    }
    commitClientNavigationState();
  });`),
            map: null,
          };
        },
      },
      sites(),
      cloudflare({
        viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] },
        config: localBindingConfig,
      }),
    ],
  };
});
