import { QrCodePix } from "qrcode-pix";

const DEFAULT_PIX_KEY = "sua-chave-pix@email.com";
const PIX_MERCHANT_NAME = "Brivan Sabor";
const PIX_MERCHANT_CITY = "Campo Grande";
const PIX_TRANSACTION_ID_MAX_LENGTH = 25;

export function generatePixPayload(
  valor: number,
  orderId: string,
  pixKey: string = process.env.NEXT_PUBLIC_PIX_KEY ?? DEFAULT_PIX_KEY
): string {
  const qrCodePix = QrCodePix({
    version: "01",
    key: pixKey,
    name: PIX_MERCHANT_NAME,
    city: PIX_MERCHANT_CITY,
    transactionId: orderId.slice(0, PIX_TRANSACTION_ID_MAX_LENGTH),
    value: valor,
  });

  return qrCodePix.payload();
}
