import * as z from "zod";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const imageFileSchema = z
  .instanceof(File, { message: "Selecione um arquivo de imagem" })
  .refine((file) => file.size <= MAX_IMAGE_SIZE_BYTES, {
    message: "A imagem deve ter no máximo 5MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Formato inválido. Use JPG, PNG ou WEBP",
  });

const imageUrlSchema = z.string().refine(
  (value) => value.startsWith("/") || /^https?:\/\//.test(value),
  { message: "Informe uma URL ou caminho de imagem válido" }
);

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
  image: z.union([imageFileSchema, imageUrlSchema]).optional(),
  isActive: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
