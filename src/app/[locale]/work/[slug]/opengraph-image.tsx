import { siteConfig } from "@/config/site";
import { realOrUndefined } from "@/lib/content";
import { getProject } from "@/lib/projects";
import { OG_SIZE, renderOgImage } from "../../../og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = siteConfig.seo.description;

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = realOrUndefined(getProject("en", slug)?.frontmatter.title);
  return renderOgImage(title ?? siteConfig.seo.description);
}
