import site from "../../content/site.json";

export type Locale = "en" | "ar";

export const siteConfig = site;

export const LOCALES: readonly Locale[] = ["en", "ar"];

/** Narrows a route segment to a supported locale. */
export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Picks the field for the current locale from content that stores both (e.g. title / titleAr). */
export function pick<T>(locale: Locale, en: T, ar: T): T {
  return locale === "ar" ? ar : en;
}

export const DIRECTION: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};

/** Brand names per locale — the only place components read the studio name from. */
export function getBrandNames(locale: Locale) {
  return {
    name: site.studioName,
    nameAr: site.studioNameAr,
    descriptor: locale === "ar" ? site.descriptorAr : site.descriptor,
  };
}

/** Route builders keep URLs consistent and avoid hard-coded strings across components. */
export const routes = {
  home: (locale: Locale) => `/${locale}`,
  work: (locale: Locale) => `/${locale}/work`,
  project: (locale: Locale, slug: string) => `/${locale}/work/${slug}`,
  about: (locale: Locale) => `/${locale}/about`,
  contact: (locale: Locale) => `/${locale}/contact`,
  section: (locale: Locale, id: string) => `/${locale}#${id}`,
} as const;
