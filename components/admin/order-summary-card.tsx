type OrderSummaryCardProps = {
  subtotal: number;
  discount: number;
  deliveryFee: number;
  totalAmount: number;
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const OrderSummaryCard = ({
  subtotal,
  discount,
  deliveryFee,
  totalAmount,
}: OrderSummaryCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <h2 className="mb-4 font-serif text-lg text-brand-off-white">
        Resumo Financeiro
      </h2>
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-brand-muted">Subtotal</span>
          <span className="text-brand-off-white">
            {currencyFormatter.format(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-brand-muted">Desconto</span>
            <span className="text-red-400">
              -{currencyFormatter.format(discount)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-brand-muted">Taxa de Entrega</span>
          <span className="text-brand-off-white">
            {currencyFormatter.format(deliveryFee)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-brand-separator/40 pt-2">
          <span className="font-medium text-brand-off-white">Total</span>
          <span className="font-serif text-lg text-brand-gold">
            {currencyFormatter.format(totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};
