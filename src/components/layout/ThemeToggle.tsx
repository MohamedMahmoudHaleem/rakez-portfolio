"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export const THEME_STORAGE_KEY = "rakeez-theme";

/**
 * Runs in <head> before the page paints, so a saved (or system) light preference
 * never flashes dark first. Dark stays the default — the brand is dark-first.
 */
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}")||(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");if(t==="light")document.documentElement.dataset.theme="light"}catch(e){}`;

/** Light/dark switch. The label stays constant; aria-pressed carries the state. */
export function ThemeToggle({ label }: { label: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.dataset.theme === "light");
  }, []);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // Private mode / blocked storage: the switch still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isLight}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full text-silver transition hover:text-soft-white"
    >
      <Sun aria-hidden="true" className="size-4 light:hidden" />
      <Moon aria-hidden="true" className="hidden size-4 light:block" />
    </button>
  );
}
