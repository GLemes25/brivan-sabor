"use client";

import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";

import { updateOrderPaymentStatus } from "@/app/actions/order";
import { PAYMENT_STATUS_LABELS } from "@/components/admin/payment-status-badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { PaymentStatus } from "@/lib/generated/prisma/client";

type PaymentStatusSelectProps = {
  orderId: string;
  currentStatus: PaymentStatus;
};

const PAYMENT_STATUS_OPTIONS: PaymentStatus[] = [
  "PENDING",
  "APPROVED",
  "REFUSED",
  "REFUNDED",
];

export const PaymentStatusSelect = ({
  orderId,
  currentStatus,
}: PaymentStatusSelectProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const nextStatus = value as PaymentStatus;
    const previousStatus = status;

    setStatus(nextStatus);
    setError(null);

    startTransition(async () => {
      const result = await updateOrderPaymentStatus(orderId, nextStatus);

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
          {PAYMENT_STATUS_OPTIONS.map((option) => (
            <SelectItem key={option} value={option}>
              {PAYMENT_STATUS_LABELS[option]}
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
