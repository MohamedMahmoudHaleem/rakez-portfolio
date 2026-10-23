import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { LeadIntro } from "@/components/sections/LeadIntro";
import { Card, Section, TechTags } from "@/components/ui";
import { existingAsset } from "@/lib/assets";
import { getDictionary } from "@/lib/dictionary";
import { getExperience } from "@/lib/experience";
import { getIcon } from "@/lib/icons";
import { pageMetadata } from "@/lib/metadata";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { getTeam } from "@/lib/team";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { about, experience } = getDictionary(locale);
  return pageMetadata({ locale, path: "/about", title: about.title, description: experience.text });
}

export default async function AboutPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const { about, ui } = getDictionary(locale);
  const experience = getExperience(locale);
  const [lead] = getTeam(locale);

  return (
    <>
      <Section id="about" title={about.title} headingAs="h1">
        {lead && <LeadIntro locale={locale} lead={lead} photoSrc={existingAsset(lead.photo)} tagline={about.tagline} intro={about.intro} contactLabel={about.contactLabel} />}
      </Section>

      <Section id="lead-experience" title={about.experienceTitle} description={experience.note} tone="deep">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experience.highlights.map((highlight) => (
            <li key={highlight.title}>
              <ExperienceCard highlight={highlight} techLabel={ui.technologies} />
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-silver">{experience.earlier}</p>
      </Section>

      <Section id="skills" title={about.skillsTitle} description={about.skillsText}>
        <ul className="grid gap-6 md:grid-cols-2">
          {experience.skillGroups.map((group) => {
            const Icon = getIcon(group.icon);
            return (
              <li key={group.title}>
                <Card className="flex h-full flex-col gap-5 transition duration-300 hover:-translate-y-1 hover:border-gold/50">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-soft-white">{group.title}</h3>
                  </div>
                  <TechTags items={group.items} label={group.title} />
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
