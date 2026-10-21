import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/** Redirects "/" by Accept-Language and keeps every page under /en or /ar. */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
