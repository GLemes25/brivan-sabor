import { ImageOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type OrderDetailItem = {
  id: string;
  productName: string;
  productImage: string;
  productSlug: string | null;
  quantity: number;
  unitPrice: number;
  addonsTotal: number;
  flavor: string | null;
  lineSubtotal: number;
};

type OrderItemsCardProps = {
  items: OrderDetailItem[];
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const OrderItemsCard = ({ items }: OrderItemsCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <h2 className="mb-4 font-serif text-lg text-brand-off-white">
        Itens do Pedido
      </h2>

      <div className="flex flex-col divide-y divide-brand-separator/40">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
          >
            {item.productImage ? (
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-brand-separator/50">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-brand-separator/50 bg-brand-black/40 text-brand-muted">
                <ImageOff className="h-6 w-6" />
              </div>
            )}

            <div className="flex-1">
              {item.productSlug ? (
                <Link
                  href={`/product/${item.productSlug}`}
                  className="font-medium text-brand-off-white transition-colors hover:text-brand-gold"
                >
                  {item.productName}
                </Link>
              ) : (
                <p className="font-medium text-brand-off-white">
                  {item.productName}
                </p>
              )}
              {item.flavor && (
                <p className="text-xs text-brand-muted">
                  Sabor: {item.flavor}
                </p>
              )}
              <p className="mt-1 text-xs text-brand-muted">
                {item.quantity}x {currencyFormatter.format(item.unitPrice)}
                {item.addonsTotal > 0 && (
                  <>
                    {" "}
                    + {currencyFormatter.format(item.addonsTotal)} de
                    adicionais
                  </>
                )}
              </p>
            </div>

            <p className="font-serif text-brand-gold">
              {currencyFormatter.format(item.lineSubtotal)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
