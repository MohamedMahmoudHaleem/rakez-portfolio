import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { THEME_INIT_SCRIPT } from "@/components/layout/ThemeToggle";
import { DIRECTION, isLocale, LOCALES, pick, siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";
import { SITE_URL } from "@/lib/metadata";
import { fontVariables } from "../fonts";
import "../globals.css";
import "../hero-background.css";

type LayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<LayoutProps, "children">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const name = pick(locale, siteConfig.studioName, siteConfig.studioNameAr);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: `${name} — ${pick(locale, siteConfig.descriptor, siteConfig.descriptorAr)}`, template: `%s · ${name}` },
    description: pick(locale, siteConfig.seo.description, siteConfig.seo.descriptionAr),
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} dir={DIRECTION[locale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-svh bg-midnight">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-on-gold focus:not-sr-only focus:fixed focus:start-4 focus:top-3"
        >
          {dictionary.ui.skipToContent}
        </a>
        <Header locale={locale} nav={dictionary.nav} ui={dictionary.ui} />
        <main id="main">{children}</main>
        <Footer locale={locale} nav={dictionary.nav} ui={dictionary.ui} rights={dictionary.footer.rights} />
      </body>
    </html>
  );
}
