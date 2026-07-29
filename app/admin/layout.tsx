import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { auth } from "@/auth";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: "Painel Administrativo | Brivan Sabor",
};

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/?error=acesso-restrito");
  }

  return (
    <div className="min-h-screen bg-brand-black">
      <AdminSidebar />

      <main className="pb-24 lg:pb-0 lg:pl-64">
        <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>

      <AdminMobileNav />
    </div>
  );
};

export default AdminLayout;
