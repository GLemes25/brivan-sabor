import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

import type { OrderItem } from "@/lib/generated/prisma/client";

const DELIVERY_FEE_ITEM_ID = "delivery-fee";

export type PaymentPreference = {
  id: string;
  init_point: string;
};

export type PixPayment = {
  id: string;
  qr_code: string;
  qr_code_base64: string;
};

export type PixCustomer = {
  email: string;
  name: string;
};

function getMercadoPagoClient(): MercadoPagoConfig {
  return new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN ?? "",
  });
}

function getAppBaseUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

function getAutoReturn(baseUrl: string): "approved" | undefined {
  const isLocalBaseUrl = baseUrl.includes("localhost");

  return isLocalBaseUrl ? undefined : "approved";
}

export async function createPaymentPreference(
  orderId: string,
  items: OrderItem[],
  totalAmount: number,
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
    (accumulatedTotal, item) =>
      accumulatedTotal + item.unit_price * item.quantity,
    0,
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
        auto_return: getAutoReturn(baseUrl),
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
      "Não foi possível criar a preferência de pagamento no Mercado Pago. Tente novamente em instantes.",
    );
  }
}

export async function createPixPayment(
  orderId: string,
  amount: number,
  customer: PixCustomer,
): Promise<PixPayment> {
  const paymentClient = new Payment(getMercadoPagoClient());

  try {
    const response = await paymentClient.create({
      body: {
        transaction_amount: amount,
        payment_method_id: "pix",
        payer: {
          email: customer.email,
          first_name: customer.name,
        },
        external_reference: orderId,
      },
    });

    const qrCode = response.point_of_interaction?.transaction_data?.qr_code;
    const qrCodeBase64 =
      response.point_of_interaction?.transaction_data?.qr_code_base64;

    if (!response.id || !qrCode || !qrCodeBase64) {
      throw new Error("Resposta incompleta do Mercado Pago.");
    }

    return {
      id: String(response.id),
      qr_code: qrCode,
      qr_code_base64: qrCodeBase64,
    };
  } catch {
    throw new Error(
      "Não foi possível gerar o pagamento PIX no Mercado Pago. Tente novamente em instantes.",
    );
  }
}
