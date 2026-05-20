"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/data";

type FeaturedProductsProps = {
  products: Product[];
};

export const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar snap-x -mx-6 px-6 md:overflow-x-visible md:grid md:grid-cols-3 md:gap-6 md:pb-0 md:mx-0 md:px-0 md:snap-none">
      {products.map((product) => (
        <div key={product.id} className="snap-start shrink-0 w-40 relative group md:w-auto md:snap-none md:hover:-translate-y-1 md:transition-all md:duration-300 ease-out md:hover:shadow-xl md:hover:shadow-brand-gold/10">
          <button className="absolute top-2 right-2 z-10 text-brand-off-white/80 hover:text-brand-gold transition-colors p-1">
            <Heart className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <Link
            href={`/product/${product.id}`}
            className="h-55 md:h-auto bg-brand-card rounded-2xl overflow-hidden flex flex-col border border-transparent group-hover:border-brand-soft-black md:group-hover:border-brand-gold/30 transition-all"
          >
            <div className="relative h-30 md:h-48 lg:h-56 w-full overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(min-width: 768px) 33vw, 160px"
              />
            </div>
            <div className="p-3 md:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-brand-off-white text-[10px] md:text-sm font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-brand-muted text-[9px] md:text-xs line-clamp-2 leading-tight">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2 md:mt-3">
                <span className="text-brand-gold font-semibold text-[10px] md:text-sm">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
                <button
                  className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-brand-gold flex items-center justify-center text-brand-black hover:bg-brand-warm-gold transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="text-lg font-medium leading-none mb-0.5">
                    +
                  </span>
                </button>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
