"use server";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { FormValues, registerSchema } from "@/schemas/form-schemas";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function registerDeliveryPerson(formData: FormValues) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const result = registerSchema.safeParse(formData);

  if (!result.success) {
    const errorMessages = result.error;
    return { error: errorMessages };
  }

  const data = result.data;

  try {
    await db.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: session.user.id },
        data: {
          name: data.name,
          phone: data.phone,
          isProfileCompleted: true,
        },
      });

      await tx.address.create({
        data: {
          userId: session.user.id,
          street: data.street,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          isDefault: true,
        },
      });

      await tx.deliveryPerson.create({
        data: {
          userId: session.user.id,
          document: data.document,
          vehicleType: data.vehicleType,
          vehiclePlate: data.vehiclePlate,
          notes: data.notes,
          status: "PENDING",
        },
      });
    });
  } catch (error) {
    console.error("Erro ao cadastrar entregador:", error);
    return { error: "Erro interno ao salvar os dados." };
  }

  redirect("/entregador/aguardando");
}
