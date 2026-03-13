"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function acceptOrder(orderId: string, deliveryPersonId: string) {
  try {
    const result = await db.$transaction(async (tx) => {
      const existingDelivery = await tx.orderDelivery.findUnique({
        where: { orderId },
      });

      if (existingDelivery) {
        throw new Error(
          "Puxa! Outro entregador foi mais rápido e já aceitou este pedido.",
        );
      }

      const delivery = await tx.orderDelivery.create({
        data: {
          orderId,
          deliveryPersonId,
          status: "ASSIGNED",
          assignedAt: new Date(),
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: {
          status: "CONFIRMED",
          deliveryPersonId: deliveryPersonId,
        },
      });

      return delivery;
    });

    revalidatePath("/entregador/dashboard");
    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("ERRO_ACEITAR_PEDIDO:", error);
    let message = "Erro ao aceitar pedido";
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}
