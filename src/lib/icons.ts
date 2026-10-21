import {
  Code2,
  Globe,
  Layers,
  LayoutDashboard,
  Plug,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files reference icons by name (e.g. "Globe").
 * One map = type safety + a single place to add new icons.
 */
export const ICONS = {
  Code2,
  Globe,
  Layers,
  LayoutDashboard,
  Plug,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function getIcon(name: string): LucideIcon {
  return name in ICONS ? ICONS[name as IconName] : Code2;
}
