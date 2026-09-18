import type { NextConfig } from "next";

const basePath = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // Vinext uses this for its router and Vite's compiled asset URLs. It must be
  // present during the build, rather than patched into the exported HTML.
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
