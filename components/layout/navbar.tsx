"use client";

import { ChevronRight, Menu, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Cardápio Completo", href: "/category/all" },
  { label: "Salgados", href: "/category/salgados" },
  { label: "Doces & Sobremesas", href: "/category/doces" },
  { label: "Tábuas de Frios", href: "/category/tabuas" },
  { label: "Buffet & Eventos", href: "/catering" },
  { label: "Nossa História", href: "/about" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-soft-black">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Brivan Sabor Logo"
              width={200}
              height={200}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/cart" className="relative group">
              <ShoppingBag className="w-6 h-6 text-brand-off-white group-hover:text-brand-gold transition-colors" />
              <span className="absolute -top-1 -right-2 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">
                1
              </span>
            </Link>
            <button className="p-1" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-7 h-7 text-brand-off-white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-brand-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between border-b border-brand-soft-black">
              <span className="font-serif text-2xl text-brand-gold">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="w-8 h-8 text-brand-off-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-2xl font-serif text-brand-off-white hover:text-brand-gold transition-colors flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all text-brand-gold" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
