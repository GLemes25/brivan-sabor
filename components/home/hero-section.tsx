"use client";

import { motion } from "framer-motion";
import { BookOpen, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90dvh] md:min-h-[70vh] lg:min-h-screen flex items-center pt-20 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 md:via-brand-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-sm md:max-w-2xl mx-20 lg:max-w-3xl flex flex-col gap-6 md:gap-15">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 "
          >
            <div className="w-8 md:w-14 h-px bg-brand-gold" />
            <span className="text-brand-gold text-[10px] md:text-sm lg:text-base font-semibold tracking-wider uppercase">
              Da nossa cozinha para os seus momentos
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-brand-off-white leading-[1.15]"
          >
            Sabores que <br className="md:hidden" />
            transformam <br />
            momentos em <br className="md:hidden" />
            experiências <br />
            <span className="text-brand-gold italic pr-2">inesquecíveis.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-brand-off-white/80 text-sm md:text-base lg:text-lg leading-relaxed max-w-[280px] sm:max-w-sm md:max-w-lg"
          >
            Salgados, doces, tábuas e buffet para tornar qualquer ocasião
            especial.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-row gap-3 md:gap-4 w-full sm:max-w-md pt-2"
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
