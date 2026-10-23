import { Mail, MapPin } from "lucide-react";
import { Eyebrow, SmartImage, TodoText } from "@/components/ui";
import { pick, siteConfig, type Locale } from "@/config/site";
import type { LocalizedTeamMember } from "@/types/content";

type LeadIntroProps = {
  locale: Locale;
  lead: LocalizedTeamMember;
  photoSrc?: string;
  /** about.tagline — the short line that opens the story. */
  tagline: string;
  /** about.intro — the studio story. */
  intro: string;
  /** Label above the email link. */
  contactLabel: string;
};

/** Photo, studio story, the lead's name and title, and a direct email link at the top of About. */
export function LeadIntro({ locale, lead, photoSrc, tagline, intro, contactLabel }: LeadIntroProps) {
  const { email } = siteConfig.contact;

  return (
    <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14">
      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-card border border-gold/30 shadow-card">
        <SmartImage src={photoSrc} alt={lead.name} fill priority sizes="280px" fallbackLabel={lead.name} className="object-cover" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-gold" />
      </div>
      <div>
        <p className="font-display text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
          <span className="text-gradient-gold">{tagline}</span>
        </p>
        <TodoText as="p" value={intro} className="mt-5 block text-lg leading-relaxed text-silver" />

        <div className="mt-8 flex flex-col gap-6 border-t border-steel/60 pt-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold text-soft-white">{lead.name}</p>
            <p className="mt-1 text-champagne">{lead.role}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-silver">
              <MapPin aria-hidden="true" className="size-4" />
              {pick(locale, siteConfig.location, siteConfig.locationAr)}
            </p>
          </div>
          <div>
            <Eyebrow className="mb-2">{contactLabel}</Eyebrow>
            <a
              href={`mailto:${email}`}
              dir="ltr"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-sm font-medium text-soft-white transition hover:border-gold hover:bg-gold/20"
            >
              <Mail aria-hidden="true" className="size-4 text-gold" />
              {email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
