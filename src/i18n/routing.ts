import { defineRouting } from "next-intl/routing";
import { LOCALES, siteConfig, type Locale } from "@/config/site";

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: siteConfig.defaultLocale as Locale,
  localePrefix: "always",
});
