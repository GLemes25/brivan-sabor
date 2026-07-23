"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

export type CreateProductResult =
  | { success: true }
  | { success: false; error: string };

export const createProduct = async (
  values: ProductFormValues
): Promise<CreateProductResult> => {
  const parsed = productFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  const { name, sku, slug, description, price, categoryId, imageUrl, isActive } =
    parsed.data;

  try {
    await prisma.product.create({
      data: {
        name,
        sku,
        slug,
        description: description || null,
        price: new Prisma.Decimal(price.replace(",", ".")),
        categoryId,
        images: imageUrl ? [imageUrl] : [],
        isActive,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        error: "Já existe um produto com este SKU ou slug.",
      };
    }

    throw error;
  }

  revalidatePath("/admin/products");

  return { success: true };
};
