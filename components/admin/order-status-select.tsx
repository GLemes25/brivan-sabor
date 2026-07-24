"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateOrderStatus } from "@/app/actions/order";
import { ORDER_STATUS_LABELS } from "@/components/admin/order-status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OrderStatus } from "@/lib/generated/prisma/client";

type OrderStatusSelectProps = {
  orderId: string;
  currentStatus: OrderStatus;
};

const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "PENDING",
  "PREPARING",
  "READY",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

export const OrderStatusSelect = ({
  orderId,
  currentStatus,
}: OrderStatusSelectProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const nextStatus = value as OrderStatus;
    const previousStatus = status;

    setStatus(nextStatus);
    setError(null);

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, nextStatus);

      if (!result.success) {
        setStatus(previousStatus);
        setError(result.error);
      }
    });
  };

  return (
    <div>
      <Select value={status} onValueChange={handleChange} disabled={isPending}>
        <SelectTrigger className="border-brand-separator/60 bg-brand-black/40 text-brand-off-white focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="border-brand-separator/50 bg-brand-soft-black/90 text-brand-off-white backdrop-blur-sm">
          {ORDER_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {ORDER_STATUS_LABELS[option]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isPending && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-muted">
          <Loader2 className="h-3 w-3 animate-spin" />
          Atualizando...
        </p>
      )}
      {error && <p className="mt-2 text-xs text-red-400/90">{error}</p>}
    </div>
  );
};
