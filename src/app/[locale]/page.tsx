import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/sections/ContactCta";
import { ExperienceStrip } from "@/components/sections/ExperienceStrip";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
// import { TeamSection } from "@/components/sections/TeamSection"; // hidden for now, see below
import { WorkSection } from "@/components/sections/WorkSection";
import { pick, siteConfig } from "@/config/site";
import { existingAsset } from "@/lib/assets";
import { getExperience } from "@/lib/experience";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
// import { getTeam } from "@/lib/team";
import { resolveLocale, type LocaleParams } from "@/lib/page";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  return pageMetadata({ locale, description: pick(locale, siteConfig.seo.description, siteConfig.seo.descriptionAr) });
}

export default async function HomePage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const dictionary = getDictionary(locale);
  const projects = getProjects(locale).filter(({ frontmatter }) => frontmatter.featured);
  // const team = getTeam(locale);

  return (
    <>
      <HeroSection locale={locale} dictionary={dictionary.hero} hasImage={Boolean(existingAsset("/images/brand/hero.webp"))} />
      <ServicesSection dictionary={dictionary.services} />
      <WorkSection
        locale={locale}
        dictionary={dictionary.work}
        techLabel={dictionary.ui.technologies}
        projects={projects}
        covers={Object.fromEntries(projects.map(({ frontmatter }) => [frontmatter.slug, existingAsset(frontmatter.cover)]))}
      />
      <ProcessSection dictionary={dictionary.process} />
      <ExperienceStrip
        locale={locale}
        dictionary={dictionary.experience}
        highlights={getExperience(locale).highlights.slice(0, 3)}
        techLabel={dictionary.ui.technologies}
      />
      {/* Team section hidden for now: clients should contact the studio, not individual members.
      <TeamSection
        dictionary={dictionary.team}
        members={team}
        photos={Object.fromEntries(team.map((member) => [member.id, existingAsset(member.photo)]))}
        linkedinLabel={dictionary.ui.linkedin}
      />
      */}
      <ContactCta dictionary={dictionary.cta} />
    </>
  );
}
