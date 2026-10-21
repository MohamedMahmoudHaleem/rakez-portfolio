import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const FRAMES = {
  desktop: {
    outer: "rounded-xl border border-steel/70 bg-deep shadow-card",
    screen: "relative aspect-[16/10] overflow-hidden rounded-b-xl",
  },
  mobile: {
    outer: "mx-auto w-full max-w-[220px] rounded-[2rem] border-4 border-steel bg-deep p-1.5 shadow-card",
    screen: "relative aspect-[390/844] overflow-hidden rounded-[1.5rem]",
  },
} as const;

type DeviceFrameProps = { type: keyof typeof FRAMES; children: ReactNode };

/** Browser window for desktop screenshots, phone body for mobile ones. */
export function DeviceFrame({ type, children }: DeviceFrameProps) {
  const frame = FRAMES[type];

  return (
    <div className={frame.outer}>
      {type === "desktop" && (
        <div aria-hidden="true" className="flex gap-1.5 border-b border-steel/70 px-3 py-2.5">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className="size-2.5 rounded-full bg-steel" />
          ))}
        </div>
      )}
      <div className={cn(frame.screen)}>{children}</div>
    </div>
  );
}
