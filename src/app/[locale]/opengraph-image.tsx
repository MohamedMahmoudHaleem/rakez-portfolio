import en from "../../../content/en.json";
import { siteConfig } from "@/config/site";
import { OG_SIZE, renderOgImage } from "../og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = siteConfig.seo.description;

export default function OpengraphImage() {
  return renderOgImage(en.hero.title);
}
