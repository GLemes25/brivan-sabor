import {
  ClipboardList,
  LayoutDashboard,
  Package,
  Tag,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Pedidos", href: "/admin/orders", icon: ClipboardList },
  { label: "Produtos", href: "/admin/products", icon: Package },
  { label: "Categorias", href: "/admin/categories", icon: Tag },
];
