import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";

type OrderStatusBadgeProps = {
  status: OrderStatus;
};

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  PREPARING: "Em Preparo",
  READY: "Pronto",
  OUT_FOR_DELIVERY: "Saiu para Entrega",
  DELIVERED: "Entregue",
  CANCELLED: "Cancelado",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  PENDING: "bg-zinc-500/10 text-zinc-400",
  PREPARING: "bg-blue-500/10 text-blue-400",
  READY: "bg-teal-500/10 text-teal-400",
  OUT_FOR_DELIVERY: "bg-orange-500/10 text-orange-400",
  DELIVERED: "bg-emerald-500/10 text-emerald-400",
  CANCELLED: "bg-red-500/10 text-red-400",
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent shrink-0", STATUS_STYLES[status])}
    >
      {ORDER_STATUS_LABELS[status]}
    </Badge>
  );
};
