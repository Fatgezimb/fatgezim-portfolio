/** Resolve a public asset or native anchor beneath the configured Pages path. */
export function publicPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  if (
    !basePath ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path === basePath ||
    path.startsWith(`${basePath}/`)
  ) {
    return path;
  }

  return `${basePath}${path}`;
}
