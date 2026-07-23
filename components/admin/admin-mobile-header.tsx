import Image from "next/image";
import Link from "next/link";

import { AdminLogoutButton } from "@/components/admin/admin-logout-button";

export const AdminMobileHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-brand-separator/40 bg-brand-black/90 px-4 backdrop-blur-md lg:hidden">
      <Link href="/admin">
        <Image
          src="/logo.png"
          alt="Brivan Sabor"
          width={120}
          height={48}
          className="object-contain"
        />
      </Link>
      <AdminLogoutButton showLabel={false} />
    </header>
  );
};
