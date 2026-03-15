import { AreaType } from "@/generated/prisma/enums";
import { db } from "@/lib/prisma";
import { startOfDay } from "date-fns";

interface DeliveryAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  complement?: string | null;
  areaType: AreaType;
}

export async function getAvailableOrders({
  deliveryPersonId,
}: {
  deliveryPersonId: string;
}) {
  const today = startOfDay(new Date());
  const threeHoursAgo = new Date();
  threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

  const person = await db.deliveryPerson.findUnique({
    where: { id: deliveryPersonId },
    select: { updatedAt: true, isOnline: true },
  });

  if (person?.isOnline && person.updatedAt < threeHoursAgo) {
    await db.deliveryPerson.update({
      where: { id: deliveryPersonId },
      data: { isOnline: false },
    });
    return [];
  }

  const rejectedOrderIds = await db.orderRejection.findMany({
    where: { deliveryPersonId },
    select: { orderId: true },
  });

  const excludedIds = rejectedOrderIds.map((r) => r.orderId);

  const orders = await db.order.findMany({
    where: {
      restaurant: { useRangoooDelivery: true },
      delivery: { is: null },
      consumptionMethod: "DELIVERY",
      createdAt: {
        gte: today,
      },
      id: {
        notIn: excludedIds,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
          street: true,
          number: true,
          neighborhood: true,
          avatarImageUrl: true,
        },
      },
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return orders.map((order) => ({
    ...order,
    deliveryAddress: order.deliveryAddress as unknown as DeliveryAddress,
  }));
}
