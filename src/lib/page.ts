import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/config/site";

export type LocaleParams = { params: Promise<{ locale: string }> };

/** Awaits route params and 404s on an unknown locale, so pages get a typed Locale. */
export async function resolveLocale(params: LocaleParams["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
