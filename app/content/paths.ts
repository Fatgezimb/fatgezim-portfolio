/** Resolve an application or public-asset path for the current build target. */
export function sitePath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_PORTFOLIO_BASE_PATH ?? "";
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`) || path.startsWith(`${basePath}?`) || path.startsWith(`${basePath}#`)) return path;
  return `${basePath}${path}`;
}
