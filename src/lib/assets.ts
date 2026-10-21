import fs from "node:fs";
import path from "node:path";

/**
 * Returns the path only if the file exists in /public.
 * Missing images then render as branded placeholders instead of 404 requests.
 */
export function existingAsset(src: string | undefined): string | undefined {
  if (!src?.startsWith("/")) return undefined;
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
}
