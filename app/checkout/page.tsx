"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="w-10 h-10 bg-brand-soft-black rounded-full text-brand-off-white hover:text-brand-gold hover:bg-brand-soft-black"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-serif text-2xl text-brand-off-white uppercase tracking-widest">
          Finalizar Pedido
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
