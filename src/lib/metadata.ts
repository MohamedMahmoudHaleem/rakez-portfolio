import type { Metadata } from "next";
import { siteConfig, type Locale } from "@/config/site";
import { realOrUndefined } from "./content";

/** Falls back to localhost until content/site.json has a real domain. */
export const SITE_URL = realOrUndefined(siteConfig.seo.siteUrl) ?? "http://localhost:3000";

type PageMetadataInput = {
  locale: Locale;
  /** Path after the locale, e.g. "/work". Empty for the home page. */
  path?: string;
  title?: string;
  description: string;
};

/** Canonical URL, hreflang alternates and Open Graph basics for any page. */
export function pageMetadata({ locale, path = "", title, description }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        en: `/en${path}`,
        ar: `/ar${path}`,
        "x-default": `/${siteConfig.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title: title ?? siteConfig.studioName,
      description,
      siteName: siteConfig.studioName,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      type: "website",
    },
  };
}
