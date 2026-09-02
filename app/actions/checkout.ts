"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { Prisma, type PaymentMethod } from "@/lib/generated/prisma/client";
import {
  createPaymentPreference,
  createPixPayment,
} from "@/lib/payments/mercadopago";
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
  | { success: true; orderId: string; orderNumber: number; checkoutUrl: string }
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

      return tx.order.create({
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
        include: { items: true },
      });
    });

    if (paymentMethod === "PIX") {
      const { id: gatewayId, qr_code: pixPayload } = await createPixPayment(
        order.id,
        order.totalAmount.toNumber(),
        {
          email: session.user.email ?? "",
          name: session.user.name ?? "",
        }
      );

      const expiresAt = new Date(
        Date.now() + PIX_EXPIRATION_MINUTES * 60 * 1000
      );

      await prisma.order.update({
        where: { id: order.id },
        data: { gatewayId, pixPayload, expiresAt },
      });

      return {
        success: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        checkoutUrl: `/checkout/success/${order.id}`,
      };
    }

    const { id: gatewayId, init_point: checkoutUrl } =
      await createPaymentPreference(
        order.id,
        order.items,
        order.totalAmount.toNumber()
      );

    await prisma.order.update({
      where: { id: order.id },
      data: { gatewayId },
    });

    return {
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      checkoutUrl,
    };
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

export type RetryPaymentResult =
  | { success: true; checkoutUrl: string }
  | { success: false; error: string };

export const retryPayment = async (
  orderId: string,
  paymentMethod: PaymentMethod
): Promise<RetryPaymentResult> => {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Você precisa estar autenticado para gerar um novo pagamento.",
    };
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, user: true },
  });

  if (!order || order.userId !== session.user.id) {
    return { success: false, error: "Pedido não encontrado." };
  }

  if (order.status !== "PENDING" || order.paymentStatus !== "PENDING") {
    return {
      success: false,
      error: "Este pedido já foi pago ou cancelado.",
    };
  }

  try {
    if (paymentMethod === "PIX") {
      const { id: gatewayId, qr_code: pixPayload } = await createPixPayment(
        order.id,
        order.totalAmount.toNumber(),
        {
          email: order.user.email,
          name: order.user.name,
        }
      );
      const expiresAt = new Date(
        Date.now() + PIX_EXPIRATION_MINUTES * 60 * 1000
      );

      await prisma.order.update({
        where: { id: order.id },
        data: { gatewayId, pixPayload, paymentMethod, expiresAt },
      });

      revalidatePath(`/checkout/success/${order.id}`);

      return { success: true, checkoutUrl: `/checkout/success/${order.id}` };
    }

    const { id: gatewayId, init_point: checkoutUrl } =
      await createPaymentPreference(
        order.id,
        order.items,
        order.totalAmount.toNumber()
      );

    await prisma.order.update({
      where: { id: order.id },
      data: { gatewayId, paymentMethod },
    });

    revalidatePath(`/checkout/success/${order.id}`);

    return { success: true, checkoutUrl };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    throw error;
  }
};
