import { ArrowLeft, PackageSearch } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { OrderCard, type OrderCardData } from "@/components/orders/order-card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Meus Pedidos | Brivan Sabor",
};

const OrdersPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true, address: true },
  });

  const orderCards: OrderCardData[] = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt,
    address: {
      street: order.address.street,
      number: order.address.number,
      neighborhood: order.address.neighborhood,
    },
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      productImage: item.productImage,
      quantity: item.quantity,
    })),
  }));

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-8">
      <div className="flex items-center gap-4 mb-8 border-b border-brand-soft-black pb-6">
        <Link
          href="/"
          className="w-10 h-10 bg-brand-soft-black rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-serif text-2xl text-brand-off-white uppercase tracking-widest">
          Meus Pedidos
        </h1>
      </div>

      {orderCards.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20">
          <div className="w-20 h-20 rounded-full bg-brand-soft-black flex items-center justify-center text-brand-gold">
            <PackageSearch className="w-8 h-8" />
          </div>
          <p className="text-brand-off-white/60 font-serif text-lg text-center max-w-sm">
            Você ainda não fez nenhum pedido conosco.
          </p>
          <Button
            asChild
            className="bg-brand-gold text-brand-black px-8 py-3 rounded-xl font-semibold hover:bg-brand-warm-gold"
          >
            <Link href="/">Explorar o Cardápio</Link>
          </Button>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-4">
          {orderCards.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
