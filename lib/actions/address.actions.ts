"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { CheckoutFormValues } from "@/lib/validations/checkout";

export type AddressFormValues = Omit<CheckoutFormValues, "paymentMethod">;

export const getUserDefaultAddress = async (): Promise<AddressFormValues | null> => {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const userId = session.user.id;

  const defaultAddress = await prisma.address.findFirst({
    where: { userId, isDefault: true },
  });

  const address =
    defaultAddress ??
    (await prisma.address.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    }));

  if (!address) {
    return null;
  }

  return {
    zipCode: address.zipCode,
    street: address.street,
    number: address.number,
    complement: address.complement ?? "",
    neighborhood: address.neighborhood,
    city: address.city,
    state: address.state,
  };
};

export const saveUserAddress = async (
  data: AddressFormValues
): Promise<void> => {
  const session = await auth();

  if (!session?.user?.id) {
    return;
  }

  const userId = session.user.id;
  const complement = data.complement || null;

  const existingAddress = await prisma.address.findFirst({
    where: {
      userId,
      zipCode: data.zipCode,
      street: data.street,
      number: data.number,
      complement,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
    },
  });

  if (existingAddress) {
    if (!existingAddress.isDefault) {
      await prisma.$transaction([
        prisma.address.updateMany({
          where: { userId, isDefault: true },
          data: { isDefault: false },
        }),
        prisma.address.update({
          where: { id: existingAddress.id },
          data: { isDefault: true },
        }),
      ]);
    }

    return;
  }

  await prisma.$transaction([
    prisma.address.updateMany({
      where: { userId, isDefault: true },
      data: { isDefault: false },
    }),
    prisma.address.create({
      data: {
        userId,
        zipCode: data.zipCode,
        street: data.street,
        number: data.number,
        complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        isDefault: true,
      },
    }),
  ]);
};
