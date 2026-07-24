import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(3, { message: "Informe seu nome completo" }),
    email: z.string().email({ message: "Informe um e-mail válido" }),
    password: z
      .string()
      .min(8, { message: "A senha deve ter no mínimo 8 caracteres" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirme sua senha" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;
