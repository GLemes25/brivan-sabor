"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createOrder } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/store/cart-store";
import {
  checkoutFormSchema,
  PAYMENT_METHOD_OPTIONS,
  type CheckoutFormValues,
} from "@/lib/validations/checkout";

const DELIVERY_FEE = 5.0;

const fieldClassName =
  "border-brand-soft-black bg-brand-card text-brand-off-white placeholder:text-brand-off-white/40 focus-visible:border-brand-gold focus-visible:ring-brand-gold focus-visible:ring-offset-0";

export const CheckoutForm = () => {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      paymentMethod: "PIX",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.unitPrice * item.quantity + item.addonsTotal * item.quantity,
    0
  );
  const total = items.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const onSubmit = async (values: CheckoutFormValues) => {
    setServerError(null);

    const result = await createOrder(
      values,
      items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        flavor: item.flavor,
        addons: item.addons,
      }))
    );

    if (!result.success) {
      setServerError(result.error);
      return;
    }

    clearCart();
    router.push(`/order/${result.orderId}/success`);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-20 text-center">
        <p className="text-brand-off-white/60 font-serif text-lg">
          Seu carrinho está vazio.
        </p>
        <Button
          asChild
          className="bg-brand-gold text-brand-black px-8 py-3 rounded-xl font-semibold hover:bg-brand-warm-gold"
        >
          <Link href="/category/all">Ver Cardápio</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto w-full"
      >
        <div className="flex-1 space-y-10">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-brand-off-white border-b border-brand-soft-black pb-4">
              Endereço de Entrega
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      CEP
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="00000-000"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      Estado (UF)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SP"
                        maxLength={2}
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      Rua
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome da rua"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      Número
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nº"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      Bairro
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bairro"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                      Cidade
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Cidade"
                        className={fieldClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                    Complemento (opcional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apto, bloco, referência..."
                      className={fieldClassName}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-brand-off-white border-b border-brand-soft-black pb-4">
              Forma de Pagamento
            </h2>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest text-brand-off-white/60">
                    Método
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className={fieldClassName + " w-full"}>
                        <SelectValue placeholder="Selecione a forma de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="border-brand-soft-black bg-brand-card text-brand-off-white backdrop-blur-sm">
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {serverError && (
            <p className="text-sm text-red-400/90">{serverError}</p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-gold text-brand-black font-semibold rounded-xl py-4 uppercase tracking-widest hover:bg-brand-warm-gold transition-colors disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Finalizando...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </div>

        <div className="lg:w-87.5 bg-transparent border-t lg:border-t-0 lg:border-l border-brand-soft-black pt-8 lg:pt-0 lg:pl-8 h-fit">
          <h3 className="font-serif text-lg text-brand-off-white mb-6 uppercase tracking-widest">
            Seu Pedido
          </h3>

          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.flavor ?? "default"}`}
                className="flex justify-between text-sm"
              >
                <span className="text-brand-off-white/70">
                  {item.quantity}x {item.productName}
                </span>
                <span className="text-brand-off-white">
                  R${" "}
                  {(
                    (item.unitPrice + item.addonsTotal) *
                    item.quantity
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-brand-soft-black pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">Subtotal</span>
              <span className="text-brand-off-white">
                R$ {subtotal.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-off-white/70">Entrega</span>
              <span className="text-brand-off-white">
                R$ {DELIVERY_FEE.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="font-semibold text-brand-off-white">
                Total
              </span>
              <span className="font-semibold text-brand-gold text-xl">
                R$ {total.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
