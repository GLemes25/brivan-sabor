import type { PaymentStatus } from "@/lib/generated/prisma/client";

export type PixPaymentState = "not-pix" | "pending" | "expired";

export const getPixPaymentState = (
  paymentStatus: PaymentStatus,
  expiresAt: Date | null,
  now: Date = new Date()
): PixPaymentState => {
  if (paymentStatus !== "PENDING" || expiresAt === null) {
    return "not-pix";
  }

  return expiresAt.getTime() <= now.getTime() ? "expired" : "pending";
};
