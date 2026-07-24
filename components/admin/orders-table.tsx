import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { OrderStatusBadge } from "@/components/admin/order-status-badge";
import { PaymentStatusBadge } from "@/components/admin/payment-status-badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { OrderStatus, PaymentStatus } from "@/lib/generated/prisma/client";

export type OrderRow = {
  id: string;
  orderNumber: number;
  createdAt: Date;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
};

type OrdersTableProps = {
  orders: OrderRow[];
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

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-12 text-center text-sm text-brand-muted backdrop-blur-sm">
        Nenhum pedido registrado ainda.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 shadow-lg shadow-black/30 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-brand-separator/40 hover:bg-transparent">
            <TableHead className="text-brand-muted">Pedido</TableHead>
            <TableHead className="text-brand-muted">Data/Hora</TableHead>
            <TableHead className="text-brand-muted">Cliente</TableHead>
            <TableHead className="text-brand-muted">Total</TableHead>
            <TableHead className="text-brand-muted">Pagamento</TableHead>
            <TableHead className="text-brand-muted">Status</TableHead>
            <TableHead className="text-right text-brand-muted">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="border-brand-separator/40 hover:bg-brand-black/30"
            >
              <TableCell>
                <p className="font-medium text-brand-off-white">
                  #{order.orderNumber}
                </p>
                <p className="text-xs text-brand-muted">
                  {order.itemsCount}{" "}
                  {order.itemsCount === 1 ? "item" : "itens"}
                </p>
              </TableCell>
              <TableCell className="text-brand-muted">
                {dateFormatter.format(order.createdAt)}
              </TableCell>
              <TableCell className="text-brand-off-white">
                {order.customerName}
              </TableCell>
              <TableCell className="text-brand-off-white">
                {currencyFormatter.format(order.totalAmount)}
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={order.paymentStatus} />
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-brand-separator/60 bg-transparent text-brand-off-white hover:border-brand-gold hover:bg-transparent hover:text-brand-gold"
                >
                  <Link href={`/admin/orders/${order.id}`}>
                    Ver Detalhes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
