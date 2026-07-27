import { ImageOff } from "lucide-react";
import Image from "next/image";

import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import type { OrderStatus } from "@/lib/generated/prisma/client";

export type OrderCardItem = {
  id: string;
  productName: string;
  productImage: string;
  quantity: number;
};

export type OrderCardData = {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  totalAmount: number;
  createdAt: Date;
  address: {
    street: string;
    number: string;
    neighborhood: string;
  };
  items: OrderCardItem[];
};

type OrderCardProps = {
  order: OrderCardData;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 backdrop-blur-sm p-6 shadow-lg shadow-black/30">
      <div className="flex items-start justify-between gap-4 pb-4 border-b border-brand-separator/40">
        <div>
          <p className="font-serif text-lg text-brand-off-white">
            Pedido #{order.orderNumber}
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            {dateFormatter.format(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="flex flex-col gap-3 py-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.productImage ? (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-brand-separator/50">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-brand-separator/50 bg-brand-black/40 text-brand-muted">
                <ImageOff className="h-4 w-4" />
              </div>
            )}
            <p className="text-sm text-brand-off-white">
              <span className="font-semibold text-brand-gold">
                {item.quantity}x
              </span>{" "}
              {item.productName}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-brand-separator/40">
        <p className="text-xs text-brand-muted">
          Entrega: {order.address.street}, {order.address.number} -{" "}
          {order.address.neighborhood}
        </p>
        <p className="font-serif text-lg text-brand-gold">
          {currencyFormatter.format(order.totalAmount)}
        </p>
      </div>
    </div>
  );
};
