import Link from "next/link";
import { siteConfig } from "@/config/site";
import "./globals.css";

/** Only reached for paths outside the locale middleware (e.g. a missing file). */
export default function RootNotFound() {
  return (
    <html lang={siteConfig.defaultLocale}>
      <body className="grid min-h-svh place-items-center bg-midnight text-soft-white">
        <Link href={`/${siteConfig.defaultLocale}`} className="text-gold underline underline-offset-4">
          {siteConfig.studioName}
        </Link>
      </body>
    </html>
  );
}
