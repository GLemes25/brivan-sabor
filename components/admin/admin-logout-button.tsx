"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminLogoutButtonProps = {
  showLabel?: boolean;
};

export const AdminLogoutButton = ({ showLabel = true }: AdminLogoutButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => signOut({ callbackUrl: "/" })}
      className={cn(
        "gap-3 border-brand-separator/60 bg-transparent text-brand-muted hover:bg-brand-soft-black/80 hover:text-brand-gold",
        showLabel ? "w-full justify-start" : "h-9 w-9 justify-center p-0"
      )}
    >
      <LogOut className="h-4 w-4" />
      {showLabel && "Sair"}
    </Button>
  );
};
