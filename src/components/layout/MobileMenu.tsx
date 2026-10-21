"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui";
import type { NavItem } from "@/lib/navigation";

type MobileMenuProps = {
  items: NavItem[];
  cta: NavItem;
  labels: { open: string; close: string; nav: string };
};

/** Full-screen menu below the header with a focus trap, Escape to close and scroll lock. */
export function MobileMenu({ items, cta, labels }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  // Keep Tab inside the toggle + panel while open.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") return close();
    if (event.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
    const focusable = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <div className="lg:hidden" onKeyDown={open ? onKeyDown : undefined}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full border border-steel text-soft-white transition hover:border-champagne"
      >
        {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      {/* Portal: the header's backdrop-blur would otherwise become the containing block of this fixed panel. */}
      {open &&
        createPortal(
        <div ref={panelRef} id="mobile-menu" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-midnight px-5 pb-10">
          <nav aria-label={labels.nav}>
            <ul className="divide-y divide-steel/50">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className="block py-4 font-display text-xl text-soft-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={cta.href} size="lg" className="mt-8 w-full">
            {cta.label}
          </Button>
        </div>,
          document.body,
        )}
    </div>
  );
}
