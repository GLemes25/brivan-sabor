import type { LucideIcon } from "lucide-react";
import { Cake, Croissant, Grape, Truck, UtensilsCrossed } from "lucide-react";

export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  Croissant,
  Cake,
  Grape,
  UtensilsCrossed,
  Truck,
};

export const DEFAULT_CATEGORY_ICON: LucideIcon = Croissant;

export const getCategoryIcon = (icon: string): LucideIcon => {
  return CATEGORY_ICON_MAP[icon] ?? DEFAULT_CATEGORY_ICON;
};
