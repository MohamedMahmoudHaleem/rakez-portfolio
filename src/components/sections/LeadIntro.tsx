import { MapPin } from "lucide-react";
import { SmartImage, TodoText } from "@/components/ui";
import { pick, siteConfig, type Locale } from "@/config/site";
import type { LocalizedTeamMember } from "@/types/content";

type LeadIntroProps = {
  locale: Locale;
  lead: LocalizedTeamMember;
  photoSrc?: string;
  /** about.intro — still [TODO] until the lead writes it. */
  intro: string;
};

/** Photo, studio story and the lead's name and title at the top of About. */
export function LeadIntro({ locale, lead, photoSrc, intro }: LeadIntroProps) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14">
      <div className="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-card border border-steel/60">
        <SmartImage src={photoSrc} alt={lead.name} fill priority sizes="280px" fallbackLabel={lead.name} className="object-cover" />
      </div>
      <div>
        <TodoText as="p" value={intro} className="block text-lg leading-relaxed text-silver" />
        <p className="mt-8 font-display text-xl font-semibold text-soft-white">{lead.name}</p>
        <p className="mt-1 text-champagne">{lead.role}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-silver">
          <MapPin aria-hidden="true" className="size-4" />
          {pick(locale, siteConfig.location, siteConfig.locationAr)}
        </p>
      </div>
    </div>
  );
}
