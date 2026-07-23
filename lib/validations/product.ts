import * as z from "zod";

export const productFormSchema = z.object({
  name: z.string().min(2, { message: "Informe o nome do produto" }),
  sku: z.string().min(1, { message: "Informe o SKU" }),
  slug: z
    .string()
    .min(1, { message: "Informe o slug" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Use apenas letras minúsculas, números e hífens",
    }),
  description: z.string().optional(),
  price: z
    .string()
    .min(1, { message: "Informe o preço" })
    .refine((value) => Number(value.replace(",", ".")) > 0, {
      message: "Informe um preço válido",
    }),
  categoryId: z.string().min(1, { message: "Selecione uma categoria" }),
  imageUrl: z
    .string()
    .trim()
    .url({ message: "Informe uma URL válida" })
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
