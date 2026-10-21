import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// next/og renders outside the browser and can't read CSS variables, so the
// three brand colors it needs are mirrored here from globals.css (@theme).
const OG_COLORS = { midnight: "#0b1220", gold: "#d4af37", silver: "#a7b0bd", softWhite: "#f8fafc" } as const;

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared link-preview layout. Latin text only: the default next/og font has no Arabic
 * glyphs, so Arabic pages reuse the English preview until an Arabic font file is bundled.
 */
export function renderOgImage(title: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: OG_COLORS.midnight, color: OG_COLORS.softWhite }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, letterSpacing: 10, fontWeight: 700 }}>{siteConfig.studioName.toUpperCase()}</div>
          <div style={{ marginTop: 10, fontSize: 18, letterSpacing: 6, color: OG_COLORS.silver }}>{siteConfig.descriptor.toUpperCase()}</div>
        </div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>{title}</div>
        <div style={{ width: 220, height: 4, background: OG_COLORS.gold }} />
      </div>
    ),
    OG_SIZE,
  );
}
