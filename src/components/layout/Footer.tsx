import { Mail } from "lucide-react";
// import { MessageCircle } from "lucide-react"; // WhatsApp hidden for now
import Link from "next/link";
import { Brand } from "@/components/brand/Brand";
import { GithubIcon, LinkedinIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui";
import { getBrandNames, pick, siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/lib/dictionary";
import { getNavItems } from "@/lib/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

type FooterProps = {
  locale: Locale;
  nav: Dictionary["nav"];
  ui: Dictionary["ui"];
  rights: string;
};

const LINK = "text-sm text-silver transition hover:text-soft-white";

/** Site footer: brand, navigation, direct contacts, language switch and copyright. */
export function Footer({ locale, nav, ui, rights }: FooterProps) {
  const brand = getBrandNames(locale);
  const { contact } = siteConfig;
  const contacts = [
    { href: `mailto:${contact.email}`, label: ui.email, Icon: Mail, external: false },
    // WhatsApp hidden for now: the wa.me link exposes the phone number.
    // { href: contact.whatsapp, label: ui.whatsapp, Icon: MessageCircle, external: true },
    { href: contact.linkedin, label: ui.linkedin, Icon: LinkedinIcon, external: true },
    { href: contact.github, label: ui.github, Icon: GithubIcon, external: true },
  ];

  return (
    <footer className="border-t border-steel/50 bg-deep">
      <Container width="wide" className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Brand {...brand} layout="stacked" markSize={48} className="md:hidden" />
          <Brand {...brand} markSize={44} className="hidden md:inline-flex" />
        </div>

        <nav aria-label={ui.footerNav}>
          <ul className="grid gap-3">
            {getNavItems(locale, nav).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={LINK}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid content-start gap-3">
          {contacts.map(({ href, label, Icon, external }) => (
            <li key={label}>
              <a href={href} className={`${LINK} inline-flex items-center gap-2`} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </Container>

      <Container width="wide" className="flex flex-col-reverse items-center justify-between gap-4 border-t border-steel/40 py-6 sm:flex-row">
        <p className="text-sm text-silver">
          © {new Date().getFullYear()} {pick(locale, brand.name, brand.nameAr)}. {rights}
        </p>
        <LanguageSwitch locale={locale} label={nav.lang} className="-me-3" />
      </Container>
    </footer>
  );
}
