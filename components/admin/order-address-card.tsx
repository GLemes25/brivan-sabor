type OrderAddressCardProps = {
  address: {
    street: string;
    number: string;
    complement: string | null;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export const OrderAddressCard = ({ address }: OrderAddressCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <h2 className="mb-4 font-serif text-lg text-brand-off-white">
        Endereço de Entrega
      </h2>
      <div className="flex flex-col gap-1 text-sm">
        <p className="text-brand-off-white">
          {address.street}, {address.number}
          {address.complement && ` - ${address.complement}`}
        </p>
        <p className="text-brand-muted">{address.neighborhood}</p>
        <p className="text-brand-muted">
          {address.city} - {address.state}
        </p>
        <p className="text-brand-muted">CEP: {address.zipCode}</p>
      </div>
    </div>
  );
};
