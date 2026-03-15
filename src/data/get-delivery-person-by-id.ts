import { db } from "@/lib/prisma";

export async function getDeliveryPersonByUserId(userId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const deliveryPerson = await db.deliveryPerson.findUnique({
    where: { userId: userId },
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
      deliverySessions: {
        where: {
          date: startOfDay,
        },
        take: 1,
      },
    },
  });

  return deliveryPerson;
}
