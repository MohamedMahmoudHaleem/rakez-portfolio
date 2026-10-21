import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/sections/ContactCta";
import { WorkSection } from "@/components/sections/WorkSection";
import { existingAsset } from "@/lib/assets";
import { getDictionary } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/metadata";
import { resolveLocale, type LocaleParams } from "@/lib/page";
import { getProjects } from "@/lib/projects";

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { work } = getDictionary(locale);
  return pageMetadata({ locale, path: "/work", title: work.title, description: work.subtitle });
}

export default async function WorkPage({ params }: LocaleParams) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);
  const dictionary = getDictionary(locale);
  const projects = getProjects(locale);

  return (
    <>
      <WorkSection
        asPage
        locale={locale}
        dictionary={dictionary.work}
        techLabel={dictionary.ui.technologies}
        projects={projects}
        covers={Object.fromEntries(projects.map(({ frontmatter }) => [frontmatter.slug, existingAsset(frontmatter.cover)]))}
      />
      <ContactCta dictionary={dictionary.cta} />
    </>
  );
}
