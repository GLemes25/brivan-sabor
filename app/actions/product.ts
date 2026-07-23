"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import {
  productFormSchema,
  type ProductFormValues,
} from "@/lib/validations/product";

export type ProductActionResult =
  | { success: true }
  | { success: false; error: string };

const toProductData = (values: ProductFormValues) => {
  const { name, sku, slug, description, price, categoryId, imageUrl, isActive } =
    values;

  return {
    name,
    sku,
    slug,
    description: description || null,
    price: new Prisma.Decimal(price.replace(",", ".")),
    categoryId,
    images: imageUrl ? [imageUrl] : [],
    isActive,
  };
};

export const createProduct = async (
  values: ProductFormValues
): Promise<ProductActionResult> => {
  const parsed = productFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  try {
    await prisma.product.create({ data: toProductData(parsed.data) });
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

export const updateProduct = async (
  id: string,
  values: ProductFormValues
): Promise<ProductActionResult> => {
  const parsed = productFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: toProductData(parsed.data),
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          error: "Já existe um produto com este SKU ou slug.",
        };
      }

      if (error.code === "P2025") {
        return { success: false, error: "Produto não encontrado." };
      }
    }

    throw error;
  }

  revalidatePath("/admin/products");

  return { success: true };
};

export const deleteProduct = async (id: string): Promise<ProductActionResult> => {
  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Produto não encontrado." };
      }

      if (error.code === "P2003" || error.code === "P2014") {
        return {
          success: false,
          error:
            "Não é possível excluir este produto pois ele possui pedidos associados.",
        };
      }
    }

    throw error;
  }

  revalidatePath("/admin/products");

  return { success: true };
};
