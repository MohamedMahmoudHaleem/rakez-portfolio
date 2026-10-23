import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactOptions } from "@/components/sections/ContactOptions";
import { Section } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { contact } = getDictionary(locale);
  return pageMetadata({ locale, path: "/contact", title: contact.title, description: contact.text });
}

export default async function ContactPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const { contact, cta, ui } = getDictionary(locale);

  return (
    <Section id="contact" title={contact.title} description={contact.text} headingAs="h1">
      <div className="grid gap-12 lg:grid-cols-2">
        <ContactOptions locale={locale} cta={cta} ui={ui} />
        <ContactForm
          email={siteConfig.contact.email}
          labels={{
            title: contact.formTitle,
            name: contact.name,
            email: contact.email,
            company: contact.company,
            message: contact.message,
            send: contact.send,
            sending: contact.sending,
            successTitle: contact.successTitle,
            successText: contact.successText,
            sendAnother: contact.sendAnother,
            error: contact.error,
          }}
        />
      </div>
    </Section>
  );
}
