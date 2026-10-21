import type { ReactNode } from "react";

/** <html> lives in [locale]/layout.tsx so lang and dir follow the locale. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
