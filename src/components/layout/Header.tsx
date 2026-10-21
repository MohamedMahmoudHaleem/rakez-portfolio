import Link from "next/link";
import { Brand } from "@/components/brand/Brand";
import { Button, Container } from "@/components/ui";
import { getBrandNames, routes, type Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";
import { getNavItems } from "@/lib/navigation";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  ui: Dictionary["ui"];
};

/** Sticky site header: brand, main navigation, language switch and the "Let's talk" CTA. */
export function Header({ locale, nav, ui }: HeaderProps) {
  const brand = getBrandNames(locale);
  const items = getNavItems(locale, nav);
  const cta = { href: routes.contact(locale), label: nav.cta };

  return (
    <header className="sticky top-0 z-50 border-b border-steel/40 bg-midnight/85 backdrop-blur-md">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4">
        <Link href={routes.home(locale)} className="rounded-md">
          <Brand name={brand.name} nameAr={brand.nameAr} markSize={34} />
        </Link>

        <nav aria-label={ui.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="rounded-full px-3.5 py-2 text-sm text-silver transition hover:text-soft-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle label={ui.lightMode} />
          <LanguageSwitch locale={locale} label={nav.lang} />
          <Button href={cta.href} size="sm" className="hidden sm:inline-flex">
            {cta.label}
          </Button>
          <MobileMenu items={items} cta={cta} labels={{ open: ui.openMenu, close: ui.closeMenu, nav: ui.mainNav }} />
        </div>
      </Container>
    </header>
  );
}
