"use client";

import { ChevronRight, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CartIcon } from "@/components/cart/cart-icon";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config/site";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Cardápio Completo", href: "/category/all" },
  { label: "Salgados", href: "/category/salgados" },
  { label: "Doces & Sobremesas", href: "/category/doces" },
  { label: "Tábuas de Frios", href: "/category/tabuas" },
  { label: "Buffet & Eventos", href: "/catering" },
  { label: "Nossa História", href: "/about" },
];

type NavbarClientProps = {
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export const NavbarClient = ({ isAuthenticated, isAdmin }: NavbarClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-black/95 backdrop-blur-md border-b border-brand-soft-black">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} Logo`}
              width={200}
              height={200}
              className="object-contain"
            />
          </Link>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-4">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-[11px] font-bold uppercase tracking-widest text-brand-gold border border-brand-gold/50 hover:border-brand-gold px-3 py-1.5 rounded-sm transition-all"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="flex items-center gap-2 text-brand-off-white hover:text-brand-gold transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-xs font-semibold uppercase tracking-widest">
                    Meus Pedidos
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="h-auto p-0 text-xs font-semibold uppercase tracking-widest text-brand-off-white hover:bg-transparent hover:text-brand-gold"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 text-brand-off-white hover:text-brand-gold transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="text-xs font-semibold uppercase tracking-widest">
                  Entrar
                </span>
              </Link>
            )}
            <Link
              href={isAuthenticated ? "/orders" : "/login"}
              className="sm:hidden"
            >
              <User className="w-6 h-6 text-brand-off-white hover:text-brand-gold transition-colors" />
            </Link>
            <CartIcon />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="text-brand-off-white hover:bg-transparent hover:text-brand-gold"
            >
              <Menu className="w-7 h-7" />
            </Button>
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                className="text-brand-off-white hover:bg-transparent hover:text-brand-gold"
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-serif text-brand-off-white hover:text-brand-gold transition-colors flex items-center justify-between group"
                >
                  {link.label}
                  <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 -translate-x-2.5 group-hover:translate-x-0 transition-all text-brand-gold" />
                </Link>
              ))}

              <div className="mt-4 pt-6 border-t border-brand-soft-black flex flex-col gap-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-serif text-brand-off-white hover:text-brand-gold transition-colors"
                    >
                      Meus Pedidos
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl font-serif text-brand-gold transition-colors"
                      >
                        Painel Admin
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="h-auto w-fit justify-start p-0 text-2xl font-serif text-brand-off-white hover:bg-transparent hover:text-brand-gold"
                    >
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-serif text-brand-off-white hover:text-brand-gold transition-colors"
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
