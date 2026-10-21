import { routes, type Locale } from "@/config/site";
import type { Dictionary } from "./dictionary";

export type NavItem = { href: string; label: string };

/** Header and footer share one list, so the two navigations never drift apart. */
export function getNavItems(locale: Locale, nav: Dictionary["nav"]): NavItem[] {
  return [
    { href: routes.about(locale), label: nav.about },
    { href: routes.section(locale, "services"), label: nav.services },
    { href: routes.work(locale), label: nav.work },
    // Team section is hidden on the home page for now.
    // { href: routes.section(locale, "team"), label: nav.team },
    { href: routes.contact(locale), label: nav.contact },
  ];
}
