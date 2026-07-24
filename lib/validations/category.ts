import * as z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Informe o nome da categoria" }),
  slug: z
    .string()
    .min(1, { message: "Informe o slug" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Use apenas letras minúsculas, números e hífens",
    }),
  icon: z.string().min(1, { message: "Informe o ícone" }),
  sortOrder: z
    .string()
    .min(1, { message: "Informe a ordem de exibição" })
    .refine((value) => Number.isInteger(Number(value)) && Number(value) >= 0, {
      message: "Informe um número inteiro maior ou igual a zero",
    }),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
