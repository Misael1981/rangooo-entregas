"use server";

import { db } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  try {
    const result = await db.$transaction(async (tx) => {
      const orderData = await tx.order.findUnique({
        where: { id: orderId },
        select: { deliveryPersonId: true },
      });

      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status },
      });

      if (status === OrderStatus.DELIVERED && orderData?.deliveryPersonId) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        await tx.deliverySession.updateMany({
          where: {
            deliveryPersonId: orderData.deliveryPersonId,
            date: startOfDay,
          },
          data: {
            totalFeeToPay: { increment: 1.0 },
          },
        });
      }

      return updatedOrder;
    });

    revalidatePath("/entregador/dashboard");
    revalidatePath("/entregador/dashboard/delivery");

    const plainOrder = {
      ...result,
      totalAmount: Number(result.totalAmount),
      deliveryFee: Number(result.deliveryFee),
    };

    return { success: true, data: plainOrder };
  } catch (error: unknown) {
    console.error("ERRO_ATUALIZAR_STATUS:", error);
    let message = "Erro ao atualizar status do pedido";
    if (error instanceof Error) message = error.message;
    return { success: false, error: message };
  }
}
