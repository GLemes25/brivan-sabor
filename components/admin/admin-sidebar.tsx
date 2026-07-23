import Image from "next/image";
import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminNavLink } from "@/components/admin/admin-nav-link";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

export const AdminSidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-brand-separator/40 bg-brand-black/90 backdrop-blur-md lg:flex">
      <div className="flex h-20 items-center border-b border-brand-separator/40 px-6">
        <Link href="/admin">
          <Image
            src="/logo.png"
            alt="Brivan Sabor"
            width={140}
            height={56}
            className="object-contain"
          />
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 py-6">
        {ADMIN_NAV_ITEMS.map((item) => (
          <AdminNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={<item.icon className="h-5 w-5" />}
          />
        ))}
      </nav>

      <div className="border-t border-brand-separator/40 px-4 py-6">
        <AdminLogoutButton />
      </div>
    </aside>
  );
};
