"use server";

import { db } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const order = await db.order.update({
      where: { id: orderId },
      data: { status },
    });
    return { success: true, data: order };
  } catch (error: unknown) {
    console.error("ERRO_ATUALIZAR_STATUS:", error);
    let message = "Erro ao atualizar status do pedido";
    if (error instanceof Error) {
      message = error.message;
    }
    return { success: false, error: message };
  }
}
