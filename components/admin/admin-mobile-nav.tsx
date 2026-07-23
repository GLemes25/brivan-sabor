import { AdminNavLink } from "@/components/admin/admin-nav-link";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

export const AdminMobileNav = () => {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-brand-separator/40 bg-brand-black/90 backdrop-blur-md lg:hidden">
      {ADMIN_NAV_ITEMS.map((item) => (
        <AdminNavLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={<item.icon className="h-5 w-5" />}
          variant="mobile"
        />
      ))}
    </nav>
  );
};
