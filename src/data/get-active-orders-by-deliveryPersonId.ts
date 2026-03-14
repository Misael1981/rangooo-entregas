import { db } from "@/lib/prisma";
import { AreaType } from "@/generated/prisma/enums";

interface DeliveryAddress {
  city: string;
  number: string;
  street: string;
  areaType: AreaType;
  reference?: string | null;
  complement?: string | null;
  neighborhood: string;
}

export async function getActiveOrders(deliveryPersonId: string) {
  const activeOrders = await db.order.findMany({
    where: {
      deliveryPersonId,
      status: {
        in: ["CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY"],
      },
    },
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      orderNumber: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      totalAmount: true,
      deliveryAddress: true,
      paymentMethod: true,
      consumptionMethod: true,
      deliveryPersonId: true,
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
        select: {
          name: true,
          phone: true,
        },
      },
      items: {
        select: {
          quantity: true,
          priceAtOrder: true,
          customName: true,
        },
      },
    },
  });

  return activeOrders.map((order) => ({
    ...order,
    orderNumber: Number(order.orderNumber),
    totalAmount: Number(order.totalAmount),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    deliveryAddress: order.deliveryAddress as unknown as DeliveryAddress,
    items: order.items.map((item) => ({
      ...item,
      priceAtOrder: Number(item.priceAtOrder),
    })),
  }));
}
