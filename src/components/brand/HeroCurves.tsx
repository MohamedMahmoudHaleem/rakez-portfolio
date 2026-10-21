/**
 * Decorative stand-in for the final hero image (IMAGES.md → hero.webp):
 * abstract dark curves with one thin gold light line, kept on the side away from the text.
 * Drawn here rather than cropped from the moodboards. Mirrors itself in RTL.
 */
export function HeroCurves() {
  const curves = [
    "M520 900C760 700 980 560 1440 520",
    "M600 900C820 720 1040 610 1440 600",
    "M700 900C900 760 1100 680 1440 690",
    "M820 900C980 800 1160 760 1440 780",
  ];

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMid slice"
      className="hero-curves pointer-events-none absolute inset-0 -z-10 size-full rtl:-scale-x-100"
    >
      <defs>
        <linearGradient id="hero-gold" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" style={{ stopColor: "var(--color-gold)", stopOpacity: 0 }} />
          <stop offset="0.55" style={{ stopColor: "var(--color-champagne)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-gold)", stopOpacity: 0.2 }} />
        </linearGradient>
        <radialGradient id="hero-glow" cx="0.78" cy="0.42" r="0.45">
          <stop offset="0" style={{ stopColor: "var(--color-steel)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--color-midnight)", stopOpacity: 0 }} />
        </radialGradient>
        <filter id="hero-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <rect width="1440" height="900" fill="url(#hero-glow)" />
      {curves.map((d) => (
        <path key={d} d={d} fill="none" className="stroke-steel/70" strokeWidth="1.25" />
      ))}
      <path d="M380 900C700 640 1000 470 1440 430" fill="none" stroke="url(#hero-gold)" strokeWidth="8" filter="url(#hero-blur)" opacity="0.55" />
      <path d="M380 900C700 640 1000 470 1440 430" fill="none" stroke="url(#hero-gold)" strokeWidth="1.5" className="hero-curves__line" />
    </svg>
  );
}
