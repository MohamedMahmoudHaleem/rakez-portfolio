"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { SmartImage } from "@/components/ui";
import { siteConfig } from "@/config/site";
import type { GalleryImage } from "@/types/content";
import { DeviceFrame } from "./DeviceFrame";

/** A gallery entry whose src is undefined when the screenshot file doesn't exist yet. */
export type GalleryItem = Omit<GalleryImage, "src"> & { src?: string };

type GalleryProps = {
  title: string;
  items: GalleryItem[];
  labels: { open: string; close: string; previous: string; next: string };
};

const ICON_BUTTON = "grid size-11 place-items-center rounded-full border border-steel bg-midnight/80 text-soft-white transition hover:border-champagne";

/** Framed screenshots; existing images open in a keyboard-accessible lightbox (native <dialog>). */
export function Gallery({ title, items, labels }: GalleryProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewable = items.filter((item): item is GalleryImage => Boolean(item.src));
  const [index, setIndex] = useState(0);
  const current = viewable[index];

  const open = (src: string) => {
    setIndex(viewable.findIndex((item) => item.src === src));
    dialogRef.current?.showModal();
  };
  const step = (delta: number) => setIndex((value) => (value + delta + viewable.length) % viewable.length);
  const isRtl = () => document.documentElement.dir === "rtl";

  // Arrow keys follow reading direction; Escape is handled by <dialog> itself.
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(isRtl() ? -1 : 1);
    if (event.key === "ArrowLeft") step(isRtl() ? 1 : -1);
  };

  const groups = (["desktop", "mobile"] as const).map((type) => ({ type, items: items.filter((item) => item.type === type) }));

  return (
    <section aria-labelledby="gallery-title" className="mt-16">
      <h2 id="gallery-title" className="font-display text-2xl font-semibold text-soft-white">{title}</h2>
      {groups.map(({ type, items: group }) =>
        group.length === 0 ? null : (
          <ul key={type} className={type === "desktop" ? "mt-8 grid gap-6 md:grid-cols-2" : "mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"}>
            {group.map((item, position) => (
              <li key={item.src ?? `${type}-${position}`}>
                <DeviceFrame type={type}>
                  {item.src ? (
                    <button type="button" onClick={() => open(item.src!)} aria-label={`${labels.open}: ${item.alt}`} className="block size-full">
                      <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" />
                    </button>
                  ) : (
                    <SmartImage alt={item.alt} fallbackLabel={siteConfig.studioName} />
                  )}
                </DeviceFrame>
              </li>
            ))}
          </ul>
        ),
      )}

      <dialog
        ref={dialogRef}
        aria-label={current?.alt}
        onKeyDown={onKeyDown}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
        className="m-auto max-h-[92svh] w-[min(1200px,94vw)] bg-transparent p-0 backdrop:bg-midnight/90"
      >
        {current && (
          <div className="relative">
            <Image src={current.src} alt={current.alt} width={1440} height={900} className="mx-auto max-h-[80svh] w-auto rounded-xl object-contain" />
            <div className="mt-4 flex items-center justify-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className={ICON_BUTTON}>
                <ChevronLeft aria-hidden="true" className="size-5 rtl:-scale-x-100" />
              </button>
              <button type="button" onClick={() => dialogRef.current?.close()} aria-label={labels.close} className={ICON_BUTTON}>
                <X aria-hidden="true" className="size-5" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label={labels.next} className={ICON_BUTTON}>
                <ChevronRight aria-hidden="true" className="size-5 rtl:-scale-x-100" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
