"use server";

import { revalidatePath } from "next/cache";

import {
  Prisma,
  type OrderStatus,
  type PaymentStatus,
} from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type OrderActionResult =
  | { success: true }
  | { success: false; error: string };

const revalidateOrderPaths = () => {
  revalidatePath("/admin/orders");
  revalidatePath("/admin/orders/[id]", "page");
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus
): Promise<OrderActionResult> => {
  try {
    await prisma.order.update({ where: { id }, data: { status } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { success: false, error: "Pedido não encontrado." };
    }

    throw error;
  }

  revalidateOrderPaths();

  return { success: true };
};

export const updateOrderPaymentStatus = async (
  id: string,
  paymentStatus: PaymentStatus
): Promise<OrderActionResult> => {
  try {
    await prisma.order.update({ where: { id }, data: { paymentStatus } });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return { success: false, error: "Pedido não encontrado." };
    }

    throw error;
  }

  revalidateOrderPaths();

  return { success: true };
};
