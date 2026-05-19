"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, ShoppingBag } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-150 flex flex-col justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Mesa gourmet"
          fill
          className="object-cover object-right"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-[1px] bg-brand-gold" />
          <span className="text-brand-gold text-[10px] font-semibold tracking-wider uppercase">
            Da nossa cozinha para os seus momentos
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-serif text-brand-off-white leading-[1.1] mb-4"
        >
          Sabores que <br />
          transformam <br />
          momentos em <br />
          experiências <br />
          <span className="text-brand-gold italic pr-2">inesquecíveis.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-brand-off-white/70 text-sm mb-8 leading-relaxed max-w-70"
        >
          Salgados, doces, tábuas e buffet para tornar qualquer ocasião
          especial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          <Link
            href="/category/all"
            className="flex-1 bg-brand-gold text-brand-black font-semibold text-[10px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-warm-gold transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            FAZER PEDIDO
          </Link>
          <Link
            href="/category/all"
            className="flex-1 bg-transparent border border-brand-gold text-brand-off-white font-semibold text-[10px] py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-brand-gold/10 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            VER CARDÁPIO
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
