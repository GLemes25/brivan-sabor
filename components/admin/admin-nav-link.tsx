"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminNavLinkProps = {
  href: string;
  label: string;
  icon: ReactNode;
  variant?: "sidebar" | "mobile";
};

export const AdminNavLink = ({
  href,
  label,
  icon,
  variant = "sidebar",
}: AdminNavLinkProps) => {
  const pathname = usePathname();
  const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-semibold uppercase tracking-wide transition-colors",
          isActive
            ? "text-brand-gold"
            : "text-brand-muted hover:text-brand-off-white"
        )}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
        isActive
          ? "border border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
          : "text-brand-muted hover:bg-brand-soft-black/80 hover:text-brand-off-white"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};
