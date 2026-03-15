"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function rejectOrder(
  orderId: string,
  deliveryPersonId: string,
  reason: string,
) {
  try {
    await db.$transaction(async (tx) => {
      await tx.orderRejection.create({
        data: {
          orderId,
          deliveryPersonId,
          reason,
        },
      });

      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const session = await tx.deliverySession.upsert({
        where: {
          deliveryPersonId_date: {
            deliveryPersonId,
            date: startOfDay,
          },
        },
        update: {
          rejectionsCount: { increment: 1 },
        },
        create: {
          deliveryPersonId,
          date: startOfDay,
          rejectionsCount: 1,
          startTime: new Date(),
        },
      });

      // 4. Checa o limite de 3
      if (session.rejectionsCount >= 3) {
        await tx.deliveryPerson.update({
          where: { id: deliveryPersonId },
          data: { isOnline: false },
        });
      }
    });

    revalidatePath("/entregador/dashboard");
    return { success: true };
  } catch (error) {
    console.error("REJECT_ORDER_ERROR:", error);
    return { success: false, error: "Erro ao processar rejeição." };
  }
}
