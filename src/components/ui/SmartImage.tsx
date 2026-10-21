"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/content";

type SmartImageProps = Omit<ImageProps, "onError" | "src"> & {
  /** Leave empty when the file doesn't exist yet — the placeholder renders without a failed request. */
  src?: ImageProps["src"];
  /** Text used to build the placeholder initials when the image is missing. */
  fallbackLabel: string;
};

/** next/image with a branded placeholder instead of a broken image icon. */
export function SmartImage({ src, fallbackLabel, className, alt, ...props }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex size-full items-center justify-center bg-linear-to-br from-surface to-deep",
          "font-display text-3xl font-semibold text-champagne/80",
          className,
        )}
      >
        {initials(fallbackLabel)}
      </div>
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
