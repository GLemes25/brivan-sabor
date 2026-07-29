"use server";

import { auth } from "@/auth";
import { Prisma } from "@/lib/generated/prisma/client";
import { generatePixPayload } from "@/lib/pix";
import { prisma } from "@/lib/prisma";
import {
  checkoutFormSchema,
  type CheckoutFormValues,
} from "@/lib/validations/checkout";

export type CheckoutCartItem = {
  productId: string;
  quantity: number;
  flavor?: string;
  addons: string[];
};

export type CheckoutActionResult =
  | { success: true; orderId: string; orderNumber: number }
  | { success: false; error: string };

const DELIVERY_FEE = new Prisma.Decimal(5);
const PIX_EXPIRATION_MINUTES = 10;

class UnavailableProductError extends Error {}

export const createOrder = async (
  checkoutData: CheckoutFormValues,
  cartItems: CheckoutCartItem[]
): Promise<CheckoutActionResult> => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Você precisa estar autenticado para finalizar o pedido.",
    };
  }

  const parsedCheckout = checkoutFormSchema.safeParse(checkoutData);

  if (!parsedCheckout.success) {
    return {
      success: false,
      error: "Dados de entrega ou pagamento inválidos. Verifique os campos.",
    };
  }

  if (cartItems.length === 0) {
    return { success: false, error: "Seu carrinho está vazio." };
  }

  const userId = session.user.id;
  const {
    zipCode,
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    paymentMethod,
  } = parsedCheckout.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Nunca confiamos no preço enviado pelo cliente: buscamos o preço
      // real de cada produto no banco dentro da própria transação.
      const productIds = cartItems.map((item) => item.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds }, isActive: true },
      });
      const productById = new Map(
        products.map((product) => [product.id, product])
      );

      const orderItemsData = cartItems.map((item) => {
        const product = productById.get(item.productId);

        if (!product) {
          throw new UnavailableProductError();
        }

        return {
          productId: product.id,
          productName: product.name,
          productImage: product.images[0] ?? "",
          quantity: item.quantity,
          unitPrice: product.price,
          addonsTotal: new Prisma.Decimal(0),
          flavor: item.flavor || null,
          addons: item.addons,
        };
      });

      const subtotal = orderItemsData.reduce(
        (acc, item) => acc.add(item.unitPrice.mul(item.quantity)),
        new Prisma.Decimal(0)
      );
      const totalAmount = subtotal.add(DELIVERY_FEE);

      const address = await tx.address.create({
        data: {
          userId,
          zipCode,
          street,
          number,
          complement: complement || null,
          neighborhood,
          city,
          state,
        },
      });

      const createdOrder = await tx.order.create({
        data: {
          userId,
          addressId: address.id,
          status: "PENDING",
          paymentStatus: "PENDING",
          subtotal,
          deliveryFee: DELIVERY_FEE,
          totalAmount,
          paymentMethod,
          items: {
            create: orderItemsData,
          },
        },
      });

      if (paymentMethod !== "PIX") {
        return createdOrder;
      }

      const expiresAt = new Date(
        Date.now() + PIX_EXPIRATION_MINUTES * 60 * 1000
      );
      const pixPayload = generatePixPayload(
        totalAmount.toNumber(),
        createdOrder.id
      );

      return tx.order.update({
        where: { id: createdOrder.id },
        data: { pixPayload, expiresAt },
      });
    });

    return { success: true, orderId: order.id, orderNumber: order.orderNumber };
  } catch (error) {
    if (error instanceof UnavailableProductError) {
      return {
        success: false,
        error:
          "Um ou mais produtos do carrinho não estão mais disponíveis. Atualize seu carrinho e tente novamente.",
      };
    }

    throw error;
  }
};
