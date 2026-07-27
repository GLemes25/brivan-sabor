import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { SerializedProduct } from "@/types/product";

type ProductCardProps = {
  product: SerializedProduct;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 z-10 text-brand-off-white/80 hover:text-brand-gold transition-colors p-1">
        <Heart className="w-5 h-5" />
      </div>

      <Link
        href={`/product/${product.id}`}
        className="block h-65 bg-brand-card rounded-2xl overflow-hidden flex flex-col border border-transparent group-hover:border-brand-soft-black transition-all"
      >
        <div className="relative h-35 w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-serif text-brand-off-white text-sm font-semibold mb-1 line-clamp-1">
              {product.name}
            </h3>
            <p className="text-brand-muted text-[10px] line-clamp-2 leading-tight">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-brand-gold font-semibold text-sm">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            <AddToCartButton
              product={product}
              className="w-8 h-8 rounded-lg bg-brand-gold text-brand-black hover:bg-brand-warm-gold"
              iconClassName="text-xl font-medium leading-none mb-0.5"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
