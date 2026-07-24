import type { PaymentMethod } from "@/lib/generated/prisma/client";

type OrderPaymentMethodCardProps = {
  paymentMethod: PaymentMethod;
  gatewayTransactionId: string | null;
};

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  PIX: "Pix",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  CASH: "Dinheiro",
  ONLINE: "Pagamento Online",
};

export const OrderPaymentMethodCard = ({
  paymentMethod,
  gatewayTransactionId,
}: OrderPaymentMethodCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <h2 className="mb-4 font-serif text-lg text-brand-off-white">
        Método de Pagamento
      </h2>
      <p className="text-sm text-brand-off-white">
        {PAYMENT_METHOD_LABELS[paymentMethod]}
      </p>
      {gatewayTransactionId && (
        <p className="mt-1 text-xs text-brand-muted">
          ID da transação: {gatewayTransactionId}
        </p>
      )}
    </div>
  );
};
