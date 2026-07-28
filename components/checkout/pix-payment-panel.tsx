"use client";

import { Check, Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type PixPaymentPanelProps = {
  pixPayload: string;
};

export const PixPaymentPanel = ({ pixPayload }: PixPaymentPanelProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyPixCode = async () => {
    await navigator.clipboard.writeText(pixPayload);
    setHasCopied(true);
    toast.success("Código PIX copiado!");
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="rounded-2xl bg-brand-off-white p-4">
        <QRCodeCanvas value={pixPayload} size={220} bgColor="#FFFFFF" fgColor="#000000" />
      </div>
      <Button
        onClick={handleCopyPixCode}
        variant="outline"
        className="border-brand-separator/50 bg-transparent text-brand-off-white px-8 py-4 rounded-xl font-semibold uppercase tracking-widest hover:bg-brand-soft-black/90 hover:text-brand-gold transition-colors"
      >
        {hasCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        Copiar Código PIX
      </Button>
    </div>
  );
};
