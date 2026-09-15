"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { retryPayment } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import type { PaymentMethod } from "@/lib/generated/prisma/client";

type RetryPaymentButtonProps = {
  orderId: string;
  paymentMethod: PaymentMethod;
  label: string;
  variant?: "default" | "outline";
  className?: string;
};

export const RetryPaymentButton = ({
  orderId,
  paymentMethod,
  label,
  variant = "default",
  className,
}: RetryPaymentButtonProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);

    const response = await retryPayment(orderId, paymentMethod);

    if ("error" in response) {
      toast.error("Erro no Pagamento", { description: response.error });
      setIsRetrying(false);
      return;
    }

    window.location.href = response.url;
  };

  return (
    <Button
      type="button"
      variant={variant}
      disabled={isRetrying}
      onClick={handleRetry}
      className={className}
    >
      {isRetrying ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
      {label}
    </Button>
  );
};
