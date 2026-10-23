import {
  Bot,
  Building,
  Code2,
  Globe,
  Landmark,
  Layers,
  LayoutDashboard,
  Network,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  WalletCards,
  type LucideIcon,
} from "lucide-react";

/**
 * Content files reference icons by name (e.g. "Globe").
 * One map = type safety + a single place to add new icons.
 */
export const ICONS = {
  Bot,
  Building,
  Code2,
  Globe,
  Landmark,
  Layers,
  LayoutDashboard,
  Network,
  Plug,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  Users,
  WalletCards,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function getIcon(name: string): LucideIcon {
  return name in ICONS ? ICONS[name as IconName] : Code2;
}
