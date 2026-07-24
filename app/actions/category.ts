"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  categoryFormSchema,
  type CategoryFormValues,
} from "@/lib/validations/category";

export type CategoryActionResult =
  | { success: true }
  | { success: false; error: string };

const toCategoryData = (values: CategoryFormValues) => {
  const { name, slug, icon, sortOrder, isActive } = values;

  return {
    name,
    slug,
    icon,
    sortOrder: Number(sortOrder),
    isActive,
  };
};

export const createCategory = async (
  values: CategoryFormValues
): Promise<CategoryActionResult> => {
  const parsed = categoryFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  try {
    await prisma.category.create({ data: toCategoryData(parsed.data) });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe uma categoria com este slug.",
      };
    }

    throw error;
  }

  revalidatePath("/admin/categories");

  return { success: true };
};

export const updateCategory = async (
  id: string,
  values: CategoryFormValues
): Promise<CategoryActionResult> => {
  const parsed = categoryFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  try {
    await prisma.category.update({
      where: { id },
      data: toCategoryData(parsed.data),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "Já existe uma categoria com este slug.",
        };
      }

      if (error.code === "P2025") {
        return { success: false, error: "Categoria não encontrada." };
      }
    }

    throw error;
  }

  revalidatePath("/admin/categories");

  return { success: true };
};

export const deleteCategory = async (
  id: string
): Promise<CategoryActionResult> => {
  try {
    await prisma.category.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Categoria não encontrada." };
      }

      if (error.code === "P2003" || error.code === "P2014") {
        return {
          success: false,
          error:
            "Não é possível excluir uma categoria que possui produtos vinculados.",
        };
      }
    }

    throw error;
  }

  revalidatePath("/admin/categories");

  return { success: true };
};
