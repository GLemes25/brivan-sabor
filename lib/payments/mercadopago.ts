import { MercadoPagoConfig, Preference } from "mercadopago";

import type { Order, OrderItem } from "@/lib/generated/prisma/client";

const DELIVERY_FEE_ITEM_ID = "delivery-fee";

export type PaymentPreference = {
  preferenceId: string;
  checkoutUrl: string;
};

function getMercadoPagoClient(
  accessToken: string = process.env.MP_ACCESS_TOKEN ?? ""
): MercadoPagoConfig {
  return new MercadoPagoConfig({ accessToken });
}

function getAppBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function createPaymentPreference(
  order: Order,
  items: OrderItem[],
  mercadoPagoClient: MercadoPagoConfig = getMercadoPagoClient()
): Promise<PaymentPreference> {
  const preferenceClient = new Preference(mercadoPagoClient);
  const baseUrl = getAppBaseUrl();

  const preferenceItems = items.map((item) => ({
    id: item.productId,
    title: item.productName,
    quantity: item.quantity,
    currency_id: "BRL",
    unit_price: item.unitPrice.toNumber(),
  }));

  if (order.deliveryFee.greaterThan(0)) {
    preferenceItems.push({
      id: DELIVERY_FEE_ITEM_ID,
      title: "Taxa de entrega",
      quantity: 1,
      currency_id: "BRL",
      unit_price: order.deliveryFee.toNumber(),
    });
  }

  const preference = await preferenceClient.create({
    body: {
      items: preferenceItems,
      external_reference: order.id,
      auto_return: "approved",
      back_urls: {
        success: `${baseUrl}/order/${order.id}/success`,
        pending: `${baseUrl}/order/${order.id}/pending`,
        failure: `${baseUrl}/order/${order.id}/failure`,
      },
    },
  });

  const checkoutUrl = preference.sandbox_init_point ?? preference.init_point;

  if (!preference.id || !checkoutUrl) {
    throw new Error(
      "Mercado Pago não retornou um ID de preferência ou URL de checkout válidos."
    );
  }

  return { preferenceId: preference.id, checkoutUrl };
}
