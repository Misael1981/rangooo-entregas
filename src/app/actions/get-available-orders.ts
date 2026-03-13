"use server";

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

export async function getAvailableOrders() {
  const today = startOfDay(new Date());

  const orders = await db.order.findMany({
    where: {
      restaurant: { useRangoooDelivery: true },
      delivery: { is: null },
      consumptionMethod: "DELIVERY",
      createdAt: {
        gte: today,
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
