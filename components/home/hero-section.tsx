"use client";

import { motion } from "framer-motion";
import { BookOpen, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[50dvh] md:min-h-[70vh] lg:min-h-[85vh] flex flex-col md:flex-row md:items-center overflow-hidden">
      {/* Background Images & Gradients */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Mesa gourmet"
          fill
          className="object-cover object-right lg:object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-black via-brand-black/90 md:via-brand-black/70 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-brand-black via-brand-black/40 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10 flex-1 flex flex-col">
        <div className="max-w-sm md:max-w-2xl mx-5 lg:max-w-3xl flex-1 flex flex-col justify-between pt-15 lg:pb-10 md:py-6 md:min-h-[50vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-1 mb-10 md:p-2"
          >
            <div className="w-8 md:w-14 h-px bg-brand-gold" />
            <span className="text-brand-gold text-[10px] md:text-sm font-semibold tracking-wider uppercase">
              Da nossa cozinha para os seus momentos
            </span>
          </motion.div>

          <div className="flex-1 flex flex-col justify-center gap-4 my-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-brand-off-white leading-[1.15] p-1 pt-7 md:p-2"
            >
              Sabores que <br className="md:hidden" />
              transformam <br />
              momentos em <br className="md:hidden" />
              experiências <br />
              <span className="text-brand-gold italic pr-2">
                inesquecíveis.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-brand-off-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-73 sm:max-w-sm md:max-w-lg p-1 md:p-2"
            >
              Salgados, doces, tábuas e buffet para tornar qualquer ocasião
              especial.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row gap-3 md:gap-4 w-full sm:max-w-md mt-10 p-1 pb-10 md:p-2"
          >
            <Link
              href="/category/all"
              className="flex-1 bg-brand-gold text-brand-black font-semibold text-[10px] md:text-sm py-3.5 md:py-4 px-3 md:px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-warm-gold hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              FAZER PEDIDO
            </Link>
            <Link
              href="/category/all"
              className="flex-1 bg-transparent border border-brand-gold text-brand-off-white font-semibold text-[10px] md:text-sm py-3.5 md:py-4 px-3 md:px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-gold/10 hover:-translate-y-1 transition-all duration-300"
            >
              <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
              VER CARDÁPIO
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
