"use client";

import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/lib/config/site";

const WHATSAPP_DEFAULT_MESSAGE =
  "Olá, Brivan Sabor! Estou no site e preciso de uma ajuda.";

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_DEFAULT_MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-brand-black shadow-lg shadow-black/40 transition-all hover:bg-[#128C7E] hover:scale-105 hover:text-brand-off-white"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
};
