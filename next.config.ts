import type { NextConfig } from "next";

const pagesBasePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");
if (pagesBasePath && (!/^\/[A-Za-z0-9_./-]+$/.test(pagesBasePath) || pagesBasePath.includes("//") || pagesBasePath.split("/").some((part) => part === "." || part === ".."))) {
  throw new Error("PAGES_BASE_PATH must be a root-relative deployment path without traversal segments.");
}

const nextConfig: NextConfig = {
  basePath: pagesBasePath,
  env: { NEXT_PUBLIC_PORTFOLIO_BASE_PATH: pagesBasePath },
};

export default nextConfig;
