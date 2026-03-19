"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleOnlineStatus(
  deliveryPersonId: string,
  isOnline: boolean,
) {
  try {
    const result = await db.$transaction(async (tx) => {
      const updatedPerson = await tx.deliveryPerson.update({
        where: { id: deliveryPersonId },
        data: { isOnline },
      });

      if (isOnline) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        await tx.deliverySession.upsert({
          where: {
            deliveryPersonId_date: {
              deliveryPersonId,
              date: startOfDay,
            },
          },
          update: {},
          create: {
            deliveryPersonId,
            date: startOfDay,
            startTime: new Date(),
          },
        });
      } else {
        const activeSession = await tx.deliverySession.findFirst({
          where: {
            deliveryPersonId,
            endTime: null,
          },
          orderBy: { startTime: "desc" },
        });

        if (activeSession) {
          await tx.deliverySession.update({
            where: { id: activeSession.id },
            data: { endTime: new Date() },
          });
        }
      }

      return updatedPerson;
    });

    revalidatePath("/entregador/dashboard");

    return { success: true, data: result };
  } catch (error) {
    console.error("ERRO_TOGGLE_STATUS:", error);
    return { success: false, error: "Falha ao sincronizar com o servidor." };
  }
}
