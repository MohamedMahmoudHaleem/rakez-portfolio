import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { LeadIntro } from "@/components/sections/LeadIntro";
import { Section, TechTags } from "@/components/ui";
import { existingAsset } from "@/lib/assets";
import { getDictionary } from "@/lib/dictionary";
import { getExperience } from "@/lib/experience";
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
        {lead && <LeadIntro locale={locale} lead={lead} photoSrc={existingAsset(lead.photo)} intro={about.intro} />}
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

      <Section id="skills" title={about.skillsTitle}>
        <TechTags items={experience.skills} label={about.skillsTitle} />
      </Section>
    </>
  );
}
