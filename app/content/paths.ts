import { publication } from "./publication";

/** Resolve an application or public-asset path for the current build target. */
export function sitePath(path: string): string {
  const publicRoot = publication.url.slice(0, -1);
  if (path === publicRoot || path.startsWith(`${publicRoot}/`) || path.startsWith(`${publicRoot}?`) || path.startsWith(`${publicRoot}#`)) {
    const relative = path.slice(publicRoot.length);
    path = relative.startsWith("/") ? relative : `/${relative}`;
  }
  const basePath = process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? "";
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`) || path.startsWith(`${basePath}?`) || path.startsWith(`${basePath}#`)) return path;
  return `${basePath}${path}`;
}
