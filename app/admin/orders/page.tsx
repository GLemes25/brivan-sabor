import type { Metadata } from "next";

import { OrdersTable, type OrderRow } from "@/components/admin/orders-table";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Pedidos | Brivan Sabor",
};

const AdminOrdersPage = async () => {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true, items: true },
  });

  const rows: OrderRow[] = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    createdAt: order.createdAt,
    customerName: order.user.name,
    itemsCount: order.items.reduce((acc, item) => acc + item.quantity, 0),
    totalAmount: Number(order.totalAmount),
    paymentStatus: order.paymentStatus,
    status: order.status,
  }));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-serif text-3xl text-brand-off-white">Pedidos</h1>
        <p className="mt-1 text-sm text-brand-muted">
          Acompanhe e gerencie os pedidos da Brivan Sabor.
        </p>
      </div>

      <OrdersTable orders={rows} />
    </div>
  );
};

export default AdminOrdersPage;
