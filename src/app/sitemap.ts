import type { MetadataRoute } from "next";
import { LOCALES } from "@/config/site";
import { SITE_URL } from "@/lib/metadata";
// import { getProjects } from "@/lib/projects"; // case study pages off for now

export default function sitemap(): MetadataRoute.Sitemap {
  // Case study pages are off for now; re-add:
  // ...getProjects("en").map(({ frontmatter }) => `/work/${frontmatter.slug}`)
  const paths = ["", "/work", "/about", "/contact"];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: { languages: Object.fromEntries(LOCALES.map((alt) => [alt, `${SITE_URL}/${alt}${path}`])) },
    })),
  );
}
