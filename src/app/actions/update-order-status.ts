"use server";

import { db } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const result = await db.$transaction(async (tx) => {
      const order = await tx.order.update({
        where: { id: orderId },
        data: { status },
        select: {
          id: true,
          status: true,
        },
      });

      return order;
    });

    revalidatePath("/entregador/dashboard");
    revalidatePath("/entregador/dashboard/delivery");

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("ERRO_ATUALIZAR_STATUS:", error);
    let message = "Erro ao atualizar status do pedido";
    if (error instanceof Error) message = error.message;
    return { success: false, error: message };
  }
}
