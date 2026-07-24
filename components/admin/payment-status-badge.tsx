import { Badge } from "@/components/ui/badge";
import type { PaymentStatus } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  PENDING: "Pendente",
  APPROVED: "Aprovado",
  REFUSED: "Recusado",
  REFUNDED: "Reembolsado",
};

const STATUS_STYLES: Record<PaymentStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-400",
  APPROVED: "bg-emerald-500/10 text-emerald-400",
  REFUSED: "bg-red-500/10 text-red-400",
  REFUNDED: "bg-purple-500/10 text-purple-400",
};

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn("border-transparent shrink-0", STATUS_STYLES[status])}
    >
      {PAYMENT_STATUS_LABELS[status]}
    </Badge>
  );
};
