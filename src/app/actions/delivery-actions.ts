"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleOnlineStatus(
  deliveryPersonId: string,
  isOnline: boolean,
) {
  try {
    const result = await db.$transaction(async (tx) => {
      // 1. Atualiza o status principal do entregador
      const updatedPerson = await tx.deliveryPerson.update({
        where: { id: deliveryPersonId },
        data: { isOnline },
      });

      if (isOnline) {
        // 2. Se ligou o switch, CRIAMOS uma nova sessão
        await tx.deliverySession.create({
          data: {
            deliveryPersonId,
            startTime: new Date(),
          },
        });
      } else {
        // 3. Se desligou, FECHAMOS a sessão aberta (onde endTime é null)
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

    // Limpa o cache para o Dashboard refletir o novo estado
    revalidatePath("/dashboard/entregador");

    return { success: true, data: result };
  } catch (error) {
    console.error("ERRO_TOGGLE_STATUS:", error);
    return { success: false, error: "Falha ao sincronizar com o servidor." };
  }
}
