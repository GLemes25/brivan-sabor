type OrderCustomerCardProps = {
  name: string;
  email: string;
  phone: string | null;
};

export const OrderCustomerCard = ({
  name,
  email,
  phone,
}: OrderCustomerCardProps) => {
  return (
    <div className="rounded-2xl border border-brand-separator/50 bg-brand-soft-black/90 p-6 shadow-lg shadow-black/30 backdrop-blur-sm">
      <h2 className="mb-4 font-serif text-lg text-brand-off-white">
        Dados do Cliente
      </h2>
      <div className="flex flex-col gap-2 text-sm">
        <p className="text-brand-off-white">{name}</p>
        <p className="text-brand-muted">{email}</p>
        {phone && <p className="text-brand-muted">{phone}</p>}
      </div>
    </div>
  );
};
