"use server";

import { revalidatePath } from "next/cache";

import {
  Prisma,
  type OrderStatus,
  type PaymentStatus,
} from "@/lib/generated/prisma/client";
import { getPixPaymentState } from "@/lib/order-payment";
import { prisma } from "@/lib/prisma";

export type OrderPaymentView =
  | { kind: "not-found" }
  | { kind: "expired"; orderNumber: number }
  | { kind: "paid"; orderNumber: number }
  | {
      kind: "pending";
      orderNumber: number;
      totalAmount: number;
      pixPayload: string;
      expiresAt: Date;
    };

export const getOrderPaymentView = async (
  orderId: string,
  userId: string
): Promise<OrderPaymentView> => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      userId: true,
      orderNumber: true,
      totalAmount: true,
      paymentStatus: true,
      pixPayload: true,
      expiresAt: true,
    },
  });

  if (!order || order.userId !== userId || !order.pixPayload || !order.expiresAt) {
    return { kind: "not-found" };
  }

  const pixPaymentState = getPixPaymentState(
    order.paymentStatus,
    order.expiresAt
  );

  if (pixPaymentState === "not-pix") {
    return { kind: "paid", orderNumber: order.orderNumber };
  }

  if (pixPaymentState === "expired") {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "CANCELLED" },
    });

    return { kind: "expired", orderNumber: order.orderNumber };
  }

  return {
    kind: "pending",
    orderNumber: order.orderNumber,
    totalAmount: Number(order.totalAmount),
    pixPayload: order.pixPayload,
    expiresAt: order.expiresAt,
  };
};

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
