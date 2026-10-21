import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// `next dev` and `next build` get separate output folders: running a build while
// the dev server is up would otherwise overwrite its chunks ("[object Event]" errors).
export default function config(phase: string): NextConfig {
  return withNextIntl({
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next-dev" : ".next",
  });
}
