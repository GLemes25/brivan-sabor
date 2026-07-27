"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { useCartStore } from "@/lib/store/cart-store";

export const CartIcon = () => {
  const itemsCount = useCartStore((state) => state.cartItemsCount());

  return (
    <Link href="/cart" className="relative group">
      <ShoppingBag className="w-6 h-6 text-brand-off-white group-hover:text-brand-gold transition-colors" />
      {itemsCount > 0 && (
        <span className="absolute -top-1 -right-2 w-4 h-4 bg-brand-gold text-brand-black text-[10px] font-bold rounded-full flex items-center justify-center">
          {itemsCount > 9 ? "9+" : itemsCount}
        </span>
      )}
    </Link>
  );
};
