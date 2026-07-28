"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export const CheckoutBackButton = () => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className="w-10 h-10 bg-brand-soft-black rounded-full text-brand-off-white hover:text-brand-gold hover:bg-brand-soft-black"
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
};
