import { CheckoutBackButton } from "@/components/checkout/checkout-back-button";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getUserDefaultAddress } from "@/lib/actions/address.actions";

const CheckoutPage = async () => {
  const initialAddress = await getUserDefaultAddress();

  return (
    <div className="flex flex-col bg-brand-black min-h-[calc(100vh-80px)] px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <CheckoutBackButton />
        <h1 className="font-serif text-2xl text-brand-off-white uppercase tracking-widest">
          Finalizar Pedido
        </h1>
      </div>

      <CheckoutForm initialAddress={initialAddress} />
    </div>
  );
};

export default CheckoutPage;
