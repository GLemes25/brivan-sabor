"use server";

import bcrypt from "bcryptjs";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  registerFormSchema,
  type RegisterFormValues,
} from "@/lib/validations/register";

export type RegisterActionResult =
  | { success: true }
  | { success: false; error: string };

export const registerUser = async (
  values: RegisterFormValues
): Promise<RegisterActionResult> => {
  const parsed = registerFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  const { name, email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { success: false, error: "E-mail já cadastrado." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return { success: false, error: "E-mail já cadastrado." };
    }

    throw error;
  }

  return { success: true };
};
