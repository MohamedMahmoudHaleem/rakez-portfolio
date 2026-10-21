# Code Standards — DRY with readability

The goal: **every visual decision is written once**, and any file can be understood in under a minute.
DRY must never make code harder to read — when the two conflict, readability wins.

## 1. Single sources of truth

| Thing | Lives in | Never |
|---|---|---|
| Colors, fonts, radii, shadows | `src/app/globals.css` (`@theme`) | Raw hex values or `amber-400`-style default colors in components |
| Studio name, contacts, SEO | `content/site.json` → `src/config/site.ts` | Hard-coded "Rakeez" in JSX |
| All page text | `content/en.json`, `content/ar.json` | Text literals in components |
| Projects | `content/projects/*.mdx` | Project data inside components |
| URLs | `routes` in `src/config/site.ts` | Hand-written `"/en/work/..."` strings |
| Icons used by content | `src/lib/icons.ts` | Importing icons by string anywhere else |

## 2. Component layers

```
src/components/
  ui/        Generic building blocks (Button, Section, Card, Heading…). No content, no i18n.
  brand/     Logo components (RakeezMark, Brand).
  layout/    Header, Footer, LanguageSwitch — used once per page.
  sections/  Homepage/page sections. Receive content via props and compose ui/ components.
```
Rules:
- `ui/` components never import from `sections/` or read content files.
- Sections receive their dictionary as props; pages load content and pass it down.
- Import ui components from the barrel: `import { Button, Section } from "@/components/ui"`.

## 3. Variants as maps, not conditions

Write variants as a `const` object and index it — easy to read, easy to extend, type-safe:

```tsx
const VARIANTS = {
  primary: "bg-gradient-gold text-midnight",
  secondary: "border border-steel text-soft-white",
} as const;

type Props = { variant?: keyof typeof VARIANTS };
// className={cn(BASE, VARIANTS[variant])}
```
Avoid chains like `variant === "a" ? "…" : variant === "b" ? "…" : "…"`.

## 4. Repeat by mapping data, not by copying JSX

```tsx
// ✓ One layout, many items
<FeatureGrid items={dictionary.services.items} columns={4} />

// ✗ Four copied <Card> blocks with different text
```

## 5. When NOT to abstract (readability guard)
- **Rule of three:** extract a component or helper the third time a pattern appears, not the first.
- No component with more than ~7 props or boolean props that change its whole layout — split it instead.
- No "god components" that render anything based on a `type` prop.
- Keep files under ~150 lines. If a section grows, move pieces into `ui/`.
- Prefer clear names over short ones: `ProjectCard`, not `PCard`; `isTodo`, not `chk`.

## 6. TypeScript
- `strict: true`. No `any`. Content shapes live in `src/types/content.ts`.
- Derive types from data where possible (`keyof typeof VARIANTS`) so the type and the styles can't drift apart.
- Props types sit right above the component, named `<Component>Props`.

## 7. Styling
- Tailwind utilities + `cn()` for merging. `className` is always the last argument so callers can override.
- Use logical properties for RTL: `ms-/me-/ps-/pe-/start-/end-`, never `ml-/mr-/left-/right-` for layout.
- Directional icons get `rtl:-scale-x-100` (the Button already does this).
- No letter-spacing on Arabic text (`rtl:tracking-normal`).

## 8. Accessibility is built into the primitives
- `Section` labels itself with its heading (`aria-labelledby`).
- `Button` defaults to `type="button"` and handles external links safely.
- `RakeezMark` has a `decorative` mode; `StatusBadge` shows a text label, never color alone.
- Visible focus ring comes from `globals.css`; never remove outlines.

## 9. Comments
Explain **why**, not what. One short doc comment above each exported component describing its purpose.

## 10. Dependencies
Only: `next`, `react`, `typescript`, `tailwindcss` (v4), `next-intl`, `lucide-react`, `clsx`, `tailwind-merge`, `framer-motion` (optional, subtle use), an MDX loader, `gray-matter`. Ask before adding anything else.
