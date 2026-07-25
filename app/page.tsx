import { FeaturedProducts } from "@/components/home/featured-products";
import { HeroSection } from "@/components/home/hero-section";
import { ProductCard } from "@/components/category/product-card";
import { CategoryFilter } from "@/components/storefront/category-filter";
import { SearchBar } from "@/components/storefront/search-bar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/lib/generated/prisma/client";
import type { LucideIcon } from "lucide-react";
import {
  Cake,
  ChevronRight,
  Croissant,
  Grape,
  MessageCircle,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const ICON_MAP: Record<string, LucideIcon> = {
  Croissant,
  Cake,
  Grape,
  UtensilsCrossed,
  Truck,
};

type HomePageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { q, category } = await searchParams;

  const menuWhere: Prisma.ProductWhereInput = {
    isActive: true,
    ...(q ? { name: { contains: q, mode: "insensitive" } } : {}),
    ...(category ? { category: { slug: category } } : {}),
  };

  const [categories, featuredProducts, menuProducts] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 3,
    }),
    prisma.product.findMany({
      where: menuWhere,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  const serializedFeaturedProducts = featuredProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    images: product.images,
    flavors: product.flavors,
  }));

  const serializedMenuProducts = menuProducts.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    images: product.images,
    flavors: product.flavors,
  }));

  return (
    <div className="flex flex-col pb-10 md:pb-16">
      <HeroSection />

      <section className="px-6 py-10 md:py-16">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-gold md:w-12" />
              <h2 className="text-brand-gold text-[10px] md:text-sm font-semibold tracking-widest uppercase">
                Categorias
              </h2>
            </div>
            <Link
              href="/category/all"
              className="flex items-center gap-1 text-brand-gold text-[10px] md:text-sm font-semibold hover:text-brand-warm-gold transition-colors"
            >
              Ver Todas <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x md:overflow-x-visible md:grid md:grid-cols-5 md:gap-6 md:pb-0 md:snap-none">
            {categories.map((categoryItem) => {
              const Icon = ICON_MAP[categoryItem.icon] ?? Croissant;
              return (
                <Link
                  key={categoryItem.id}
                  href={`/category/${categoryItem.slug}`}
                  className="snap-start shrink-0 flex flex-col items-center gap-3 group md:snap-none"
                >
                  <div className="w-15 h-15 rounded-full bg-brand-category border border-brand-soft-black flex items-center justify-center text-brand-gold transition-colors md:w-20 md:h-20 md:group-hover:border-brand-gold md:group-hover:bg-brand-gold/10 md:group-hover:-translate-y-1 md:transition-all md:duration-300 ease-out">
                    <Icon className="w-6 h-6 stroke-[1.5] md:w-8 md:h-8 md:group-hover:text-brand-warm-gold md:transition-colors" />
                  </div>
                  <span className="text-[10px] md:text-sm font-bold text-brand-off-white">
                    {categoryItem.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-10 md:py-16">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center justify-between mb-6 md:mb-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-gold md:w-12" />
              <h2 className="text-brand-gold text-[10px] md:text-sm font-semibold tracking-widest uppercase">
                Destaques
              </h2>
            </div>
            <Link
              href="/category/all"
              className="flex items-center gap-1 text-brand-gold text-[10px] md:text-sm font-semibold hover:text-brand-warm-gold transition-colors"
            >
              Ver Todas <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
          </div>
          <FeaturedProducts products={serializedFeaturedProducts} />
        </div>
      </section>

      <section className="px-6 py-10 md:py-16">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <div className="w-8 h-px bg-brand-gold md:w-12" />
            <h2 className="text-brand-gold text-[10px] md:text-sm font-semibold tracking-widest uppercase">
              Cardápio
            </h2>
          </div>

          <div className="flex flex-col gap-4 mb-8 md:mb-10 md:gap-6">
            <SearchBar />
            <CategoryFilter categories={categories} />
          </div>

          {serializedMenuProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {serializedMenuProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-md rounded-2xl border border-brand-separator/40 bg-brand-card p-10 text-center">
              <p className="font-serif text-brand-off-white text-lg mb-2">
                Nenhum produto encontrado
              </p>
              <p className="text-brand-muted text-sm mb-6">
                Nenhum produto encontrado para esta busca. Tente outro termo
                ou limpe os filtros.
              </p>
              <Button
                asChild
                className="bg-brand-gold text-brand-black font-semibold hover:bg-brand-warm-gold transition-colors"
              >
                <Link href="/">Limpar Filtros</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 mb-4 md:mb-8">
        <div className="md:max-w-7xl md:mx-auto">
          <div className="bg-brand-card rounded-2xl p-4 md:p-6 md:rounded-3xl flex items-center justify-between gap-4 md:gap-8 hover:shadow-lg hover:shadow-brand-gold/5 transition-all duration-300">
            <a href="#" className="flex-1 flex items-center gap-3 group">
              <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-brand-gold md:group-hover:scale-110 md:transition-transform md:duration-300" />
              <div>
                <p className="text-brand-muted text-[9px] md:text-xs uppercase tracking-wider">
                  Fale Conosco
                </p>
                <p className="text-brand-off-white text-[10px] md:text-sm">
                  Pedir pelo Whatsapp
                </p>
              </div>
            </a>

            <div className="w-px h-8 md:h-12 bg-brand-separator/60" />

            <div className="flex-1 flex items-center gap-3 group">
              <Truck className="w-6 h-6 md:w-8 md:h-8 text-brand-gold md:group-hover:scale-110 md:transition-transform md:duration-300" />
              <div>
                <p className="text-brand-muted text-[9px] md:text-xs uppercase tracking-wider">
                  Entrega Rápida
                </p>
                <p className="text-brand-off-white text-[10px] md:text-sm">
                  Receba em Casa
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
