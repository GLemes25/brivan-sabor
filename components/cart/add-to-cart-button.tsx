"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import type { SerializedProduct } from "@/types/product";

type AddToCartButtonProps = {
  product: SerializedProduct;
  className?: string;
  iconClassName?: string;
};

export const AddToCartButton = ({
  product,
  className,
  iconClassName,
}: AddToCartButtonProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault();

    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.images[0] ?? "",
      unitPrice: product.price,
      addons: [],
      addonsTotal: 0,
    });

    toast.success("Adicionado à sacola!", {
      description: `${product.name} — R$ ${product.price
        .toFixed(2)
        .replace(".", ",")}`,
    });
  };

  return (
    <Button
      size="icon"
      className={className}
      onClick={handleAddToCart}
    >
      <span className={iconClassName}>+</span>
    </Button>
  );
};
