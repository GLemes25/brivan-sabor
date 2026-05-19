import Link from "next/link";
import {
  Cake,
  ChevronRight,
  Croissant,
  Grape,
  MessageCircle,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CATEGORIES, MOCK_PRODUCTS } from "@/lib/data";

const ICON_MAP: Record<string, LucideIcon> = {
  Croissant,
  Cake,
  Grape,
  UtensilsCrossed,
  Truck,
};

export default function HomePage() {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 3);

  return (
    <div className="flex flex-col pb-20">
      <HeroSection />

      <section className="px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-brand-gold" />
            <h2 className="text-brand-gold text-[10px] font-semibold tracking-widest uppercase">
              Categorias
            </h2>
          </div>
          <Link
            href="/category/all"
            className="flex items-center gap-1 text-brand-gold text-[10px] font-semibold hover:text-brand-warm-gold transition-colors"
          >
            Ver Todas <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
          {CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon] ?? Croissant;
            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className="snap-start shrink-0 flex flex-col items-center gap-3"
              >
                <div className="w-15 h-15 rounded-full bg-brand-category border border-brand-soft-black flex items-center justify-center text-brand-gold hover:border-brand-gold transition-colors">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-brand-off-white">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-brand-gold text-[10px] font-semibold tracking-widest uppercase">
            Destaques
          </h2>
          <Link
            href="/category/all"
            className="flex items-center gap-1 text-brand-gold text-[10px] font-semibold hover:text-brand-warm-gold transition-colors"
          >
            Ver Todas <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        <FeaturedProducts products={featuredProducts} />
      </section>

      <section className="px-4 mt-4">
        <div className="bg-brand-card rounded-2xl p-4 flex items-center justify-between gap-4">
          <a href="#" className="flex-1 flex items-center gap-3">
            <MessageCircle className="w-6 h-6 text-brand-gold" />
            <div>
              <p className="text-brand-muted text-[9px] uppercase tracking-wider">
                Fale Conosco
              </p>
              <p className="text-brand-off-white text-[10px]">
                Pedir pelo Whatsapp
              </p>
            </div>
          </a>

          <div className="w-px h-8 bg-brand-separator/60" />

          <div className="flex-1 flex items-center gap-3">
            <Truck className="w-6 h-6 text-brand-gold" />
            <div>
              <p className="text-brand-muted text-[9px] uppercase tracking-wider">
                Entrega Rápida
              </p>
              <p className="text-brand-off-white text-[10px]">Receba em Casa</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
