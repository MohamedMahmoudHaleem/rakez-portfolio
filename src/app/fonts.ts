import { IBM_Plex_Sans_Arabic, Inter, Manrope } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

/** Apply once on <html> in the root layout. */
export const fontVariables = [inter.variable, manrope.variable, plexArabic.variable].join(" ");
