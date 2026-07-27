import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OrderAddressCard } from "@/components/admin/order-address-card";
import { OrderCustomerCard } from "@/components/admin/order-customer-card";
import {
  OrderItemsCard,
  type OrderDetailItem,
} from "@/components/admin/order-items-card";
import { OrderPaymentMethodCard } from "@/components/admin/order-payment-method-card";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { OrderSummaryCard } from "@/components/admin/order-summary-card";
import { PaymentStatusSelect } from "@/components/admin/payment-status-select";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Detalhes do Pedido | Brivan Sabor",
};

type OrderDetailPageProps = {
  params: Promise<{ id: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      address: true,
      items: { include: { product: true } },
    },
  });

  if (!order) {
    notFound();
  }

  const items: OrderDetailItem[] = order.items.map((item) => {
    const unitPrice = Number(item.unitPrice);
    const addonsTotal = Number(item.addonsTotal);

    return {
      id: item.id,
      productName: item.productName,
      productImage: item.productImage,
      productSlug: item.product?.slug ?? null,
      quantity: item.quantity,
      unitPrice,
      addonsTotal,
      flavor: item.flavor,
      lineSubtotal: (unitPrice + addonsTotal) * item.quantity,
    };
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/orders"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-separator/50 text-brand-muted transition-colors hover:border-brand-gold hover:text-brand-gold"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-brand-off-white">
            Pedido #{order.orderNumber}
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Realizado em {dateFormatter.format(order.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <OrderItemsCard items={items} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
            <h2 className="mb-4 font-serif text-lg text-brand-off-white">
              Gerenciar Pedido
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-brand-muted">
                  Status do Pedido
                </p>
                <OrderStatusSelect
                  orderId={order.id}
                  currentStatus={order.status}
                />
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-brand-muted">
                  Status do Pagamento
                </p>
                <PaymentStatusSelect
                  orderId={order.id}
                  currentStatus={order.paymentStatus}
                />
              </div>
            </div>
          </div>

          <OrderCustomerCard
            name={order.user.name}
            email={order.user.email}
            phone={order.user.phone}
          />

          <OrderAddressCard
            address={{
              street: order.address.street,
              number: order.address.number,
              complement: order.address.complement,
              neighborhood: order.address.neighborhood,
              city: order.address.city,
              state: order.address.state,
              zipCode: order.address.zipCode,
            }}
          />

          <OrderSummaryCard
            subtotal={Number(order.subtotal)}
            discount={Number(order.discount)}
            deliveryFee={Number(order.deliveryFee)}
            totalAmount={Number(order.totalAmount)}
          />

          <OrderPaymentMethodCard
            paymentMethod={order.paymentMethod}
            gatewayTransactionId={order.gatewayTransactionId}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
