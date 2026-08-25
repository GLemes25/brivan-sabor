import { MercadoPagoConfig, Preference } from "mercadopago";

import type { OrderItem } from "@/lib/generated/prisma/client";

const DELIVERY_FEE_ITEM_ID = "delivery-fee";

export type PaymentPreference = {
  id: string;
  init_point: string;
};

function getMercadoPagoClient(): MercadoPagoConfig {
  return new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN ?? "",
  });
}

function getAppBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export async function createPaymentPreference(
  orderId: string,
  items: OrderItem[],
  totalAmount: number
): Promise<PaymentPreference> {
  const preferenceClient = new Preference(getMercadoPagoClient());
  const baseUrl = getAppBaseUrl();

  const preferenceItems = items.map((item) => ({
    id: item.productId,
    title: item.productName,
    quantity: item.quantity,
    currency_id: "BRL",
    unit_price: item.unitPrice.toNumber(),
  }));

  // totalAmount inclui a taxa de entrega, que não chega como um OrderItem —
  // completamos a diferença como um item à parte para que a soma dos itens
  // da preferência bata com o valor total do pedido.
  const itemsTotal = preferenceItems.reduce(
    (accumulatedTotal, item) => accumulatedTotal + item.unit_price * item.quantity,
    0
  );
  const deliveryFee = Math.round((totalAmount - itemsTotal) * 100) / 100;

  if (deliveryFee > 0) {
    preferenceItems.push({
      id: DELIVERY_FEE_ITEM_ID,
      title: "Taxa de entrega",
      quantity: 1,
      currency_id: "BRL",
      unit_price: deliveryFee,
    });
  }

  try {
    const preference = await preferenceClient.create({
      body: {
        items: preferenceItems,
        external_reference: orderId,
        auto_return: "approved",
        back_urls: {
          success: `${baseUrl}/order/${orderId}/success`,
          pending: `${baseUrl}/order/${orderId}/pending`,
          failure: `${baseUrl}/order/${orderId}/failure`,
        },
      },
    });

    const checkoutUrl = preference.sandbox_init_point ?? preference.init_point;

    if (!preference.id || !checkoutUrl) {
      throw new Error("Resposta incompleta do Mercado Pago.");
    }

    return { id: preference.id, init_point: checkoutUrl };
  } catch {
    throw new Error(
      "Não foi possível criar a preferência de pagamento no Mercado Pago. Tente novamente em instantes."
    );
  }
}
