import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { AtAGlance } from "@/components/sections/case-study/AtAGlance";
import { CaseStudyHeader } from "@/components/sections/case-study/CaseStudyHeader";
import { Gallery } from "@/components/sections/case-study/Gallery";
import { NextProject } from "@/components/sections/case-study/NextProject";
import { Testimonial } from "@/components/sections/case-study/Testimonial";
import { ContactCta } from "@/components/sections/ContactCta";
import { Container, SmartImage } from "@/components/ui";
import { isLocale, routes, siteConfig } from "@/config/site";
import { existingAsset } from "@/lib/assets";
import { isTodo, realOrUndefined, SHOW_TODO_PLACEHOLDERS } from "@/lib/content";
import { getDictionary } from "@/lib/dictionary";
import { renderCaseStudyBody } from "@/lib/mdx";
import { pageMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/projects";

type CaseStudyParams = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects("en").map(({ frontmatter }) => ({ slug: frontmatter.slug }));
}

async function load(params: CaseStudyParams["params"]) {
  const { locale, slug } = await params;
  const project = isLocale(locale) ? getProject(locale, slug) : undefined;
  // Unfinished case studies don't exist in production, not even by direct URL.
  if (!isLocale(locale) || !project || (!SHOW_TODO_PLACEHOLDERS && isTodo(project.frontmatter.title))) notFound();
  return { locale, slug, project };
}

export async function generateMetadata({ params }: CaseStudyParams): Promise<Metadata> {
  const { locale, slug, project } = await load(params);
  const { title, summary } = project.frontmatter;
  return pageMetadata({ locale, path: `/work/${slug}`, title: realOrUndefined(title), description: realOrUndefined(summary) ?? "" });
}

export default async function CaseStudyPage({ params }: CaseStudyParams) {
  const { locale, slug, project } = await load(params);
  setRequestLocale(locale);
  const dictionary = getDictionary(locale);
  const { frontmatter } = project;

  // Next project wraps around; missing screenshots stay as placeholders only while placeholders are on.
  const all = getProjects(locale);
  const next = all[(all.findIndex((item) => item.frontmatter.slug === slug) + 1) % all.length];
  const gallery = frontmatter.gallery
    .map((image) => ({ ...image, src: existingAsset(image.src), alt: realOrUndefined(image.alt) ?? frontmatter.title }))
    .filter((image) => SHOW_TODO_PLACEHOLDERS || image.src);

  return (
    <>
      <article className="py-12 md:py-16">
        <Container>
          <CaseStudyHeader locale={locale} project={frontmatter} dictionary={dictionary} />

          <div className="relative mt-10 aspect-video overflow-hidden rounded-card border border-steel/60">
            <SmartImage src={existingAsset(frontmatter.cover)} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" fallbackLabel={siteConfig.studioName} className="object-cover" />
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="case-study-body max-w-2xl">
              {project.isFallback && <p className="mb-8 rounded-card border border-steel/60 bg-surface/60 p-4 text-sm">{dictionary.caseStudy.englishOnly}</p>}
              <div lang={project.isFallback ? "en" : undefined} dir={project.isFallback ? "ltr" : undefined}>
                {await renderCaseStudyBody(project.body)}
              </div>
            </div>
            <aside>
              <AtAGlance project={frontmatter} dictionary={dictionary.caseStudy} techLabel={dictionary.ui.technologies} />
            </aside>
          </div>

          {gallery.length > 0 && (
            <Gallery
              title={dictionary.caseStudy.gallery}
              items={gallery}
              labels={{ open: dictionary.ui.openImage, close: dictionary.ui.close, previous: dictionary.ui.previous, next: dictionary.ui.next }}
            />
          )}
          <Testimonial testimonial={frontmatter.testimonial} />
          {next && next.frontmatter.slug !== slug && (
            <NextProject href={routes.project(locale, next.frontmatter.slug)} title={next.frontmatter.title} label={dictionary.caseStudy.next} />
          )}
        </Container>
      </article>
      <ContactCta dictionary={dictionary.cta} />
    </>
  );
}
