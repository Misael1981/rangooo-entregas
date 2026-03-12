import { db } from "@/lib/prisma";

// No seu arquivo de busca:
export async function getDeliveryPersonByUserId(userId: string) {
  const deliveryPerson = await db.deliveryPerson.findUnique({
    where: {
      userId: userId, // Busca o entregador vinculado a esse ID de usuário
    },
    include: {
      user: {
        select: {
          name: true,
          phone: true,
          email: true,
          addresses: {
            where: { isDefault: true },
            take: 1,
          },
        },
      },
    },
  });

  return deliveryPerson;
}
