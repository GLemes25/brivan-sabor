import * as z from "zod";

export const PAYMENT_METHOD_VALUES = [
  "PIX",
  "CREDIT_CARD",
  "DEBIT_CARD",
  "CASH",
  "ONLINE",
] as const;

const PAYMENT_METHOD_LABELS: Record<
  (typeof PAYMENT_METHOD_VALUES)[number],
  string
> = {
  PIX: "PIX",
  CREDIT_CARD: "Cartão de Crédito",
  DEBIT_CARD: "Cartão de Débito",
  CASH: "Dinheiro",
  ONLINE: "Pagamento Online",
};

export const PAYMENT_METHOD_OPTIONS = PAYMENT_METHOD_VALUES.map((value) => ({
  value,
  label: PAYMENT_METHOD_LABELS[value],
}));

export const checkoutFormSchema = z.object({
  zipCode: z
    .string()
    .min(8, { message: "Informe um CEP válido" })
    .max(9, { message: "Informe um CEP válido" }),
  street: z.string().min(2, { message: "Informe a rua" }),
  number: z.string().min(1, { message: "Informe o número" }),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, { message: "Informe o bairro" }),
  city: z.string().min(2, { message: "Informe a cidade" }),
  state: z
    .string()
    .length(2, { message: "Use a sigla do estado (ex: SP)" })
    .toUpperCase(),
  paymentMethod: z.enum(PAYMENT_METHOD_VALUES, {
    message: "Selecione uma forma de pagamento",
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
