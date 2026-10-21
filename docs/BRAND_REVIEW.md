# Rakeez Brand Review — what's good, what's missing, what was fixed

Reviewed: brand boards 02–06, BRAND_BRIEF.md, starter TSX/CSS files.
(Board 01 — "Scorpion Team" — is retired and not included.)

## What works
- **Name.** "Rakeez / ركيز" (pillar, foundation) fits a team selling reliability. Much safer than "Scorpion".
- **The R concept.** A geometric R with a gold diagonal leg is distinctive and works as an app icon.
- **Palette.** Midnight navy + slate + restrained gold reads premium and calm, not "gaming".
- **The brief is honest.** No fake clients, metrics or testimonials; clear accessibility rules.

## Must fix before launch

| # | Issue | Why it matters | Action |
|---|---|---|---|
| 1 | **No real vector logo.** The boards are AI-generated raster images. | You can't print, scale or export them cleanly, and small details differ between boards. | Have a designer redraw the R in Figma/Illustrator as clean vectors (a few hours of work). Deliver the variants in "Logo files needed" below. |
| 2 | **The starter `RakeezMark.tsx` doesn't match the concept.** Rendered, it's a boxy R with overlapping pieces, and it turns into a blur at 16–32px. | The favicon and navbar logo are what people see most. | Keep it only as a placeholder. Replace its three paths with the vectorized logo; the component's API stays the same. |
| 3 | **The Arabic "ركيز" in the boards is AI-drawn.** The letters are stretched and inconsistent between boards. | Arabic readers notice distorted lettering immediately; it hurts credibility. | Typeset ركيز in a real font (IBM Plex Sans Arabic SemiBold) or commission Arabic lettering matched to the R's geometry. Never trace the board lettering. |
| 4 | **Boards disagree with each other.** Board 06 adds purple, cyan and orange accents; light gray varies (#E5E7EB vs #E2E8F0); the tagline varies ("Smart" vs "Digital"); fonts vary (Montserrat vs Inter/Manrope). | Inconsistency looks unplanned. | Locked decisions below. Ignore board 06's extra colors. |
| 5 | **Gold fails as text on light backgrounds.** Gold on soft white = 2.0:1 (needs 4.5:1). Silver on soft white = 2.1:1. | Unreadable for many users; fails WCAG. | Use gold text only on dark surfaces (gold on midnight = 8.9:1 ✓). On light sections use navy text and gold only as fills/lines. |
| 6 | **Name availability unchecked.** | Someone else may own rakeez.com, the social handles, or a registered trademark. | Check domains (rakeez.dev / .team / .studio / rakeezteam.com), Instagram/LinkedIn/X handles, and the Egyptian trademark office before printing anything. |

## Contrast check (WCAG, measured)

| Text / background | Ratio | Result |
|---|---|---|
| Soft white on midnight | 17.9 | ✓ AAA |
| Champagne on midnight | 13.6 | ✓ AAA |
| Gold on midnight | 8.9 | ✓ AAA |
| Silver on midnight | 8.6 | ✓ AAA |
| Silver on slate surface | 6.7 | ✓ AA |
| Midnight on gold button | 8.9 | ✓ AAA |
| Gold on soft white | 2.0 | ✗ fail |
| Silver on soft white | 2.1 | ✗ fail |

## Locked brand decisions (single source of truth)

| Item | Decision |
|---|---|
| Name | RAKEEZ (Latin, uppercase in the logo) · ركيز (Arabic) |
| Descriptor | SOFTWARE TEAM · فريق برمجيات |
| Tagline | "Building smart solutions together." · «نبني حلولًا ذكية، معًا.» |
| Colors | Midnight #0B1220, Deep #0F172A, Surface #1E293B, Steel #334155, Silver #A7B0BD, Soft white #F8FAFC, Gold #D4AF37, Champagne #F1D9AA. No purple, cyan or orange. |
| Added colors | Success #34D399, Warning = Champagne, Danger #F87171, Info = Silver (for status badges and forms) |
| Fonts | Manrope (headings), Inter (body/UI), IBM Plex Sans Arabic (Arabic) |
| Mode | Dark-first site. Light sections allowed with navy text. |
| Hero image | Abstract dark curves with a thin gold light line (board 02/05 "Option 1"). More ownable and lighter than the mountain/golden-road scene, which looks like stock AI art. Use the mountain only if custom-made. |

## Logo files needed (from the designer)

| File | Use |
|---|---|
| `logo-horizontal.svg` (+ `-dark` for light backgrounds) | Navbar, documents |
| `logo-stacked.svg` (+ `-dark`) | Covers, proposals, social |
| `mark.svg`, `mark-mono-light.svg`, `mark-mono-dark.svg` | Small sizes, watermarks, print |
| `icon.svg` (flat, no gradient) + `favicon.ico` (32×32) | Browser tab |
| `apple-touch-icon.png` (180×180), `icon-512.png` (maskable) | Phones, PWA |
| `og-image.png` (1200×630) | Link previews on WhatsApp/LinkedIn |
| Brand rules page | Clear space (= height of the gold leg) and minimum sizes (mark 20px, horizontal logo 120px wide) |

## What was fixed in the starter code
- `Brand.tsx` used Tailwind's default `amber-400` and `slate-*` colors, bypassing the brand tokens → now uses tokens only, and takes the names as props from `content/site.json`.
- `RakeezMark.tsx` had hard-coded colors and no single-color versions → now has `color`, `light` and `dark` variants, plus a `decorative` prop so screen readers don't read the name twice.
- `brand-tokens.css` forced Arial as the font → replaced by `globals.css` with Tailwind v4 `@theme` tokens and next/font variables.
- `hero-background.css` had no RTL handling → the dark overlay now flips for Arabic so text stays readable.
- Letter spacing is removed in Arabic (`rtl:tracking-normal`) — wide tracking breaks Arabic letter joining.
