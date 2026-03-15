import { db } from "@/lib/prisma";
import { OrderStatus } from "@/generated/prisma/enums";

export async function getDeliverySummary(deliveryPersonId: string) {
  // Pegamos o início do dia atual (00:00:00)
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Buscamos todas as entregas do dia deste entregador
  const deliveries = await db.order.findMany({
    where: {
      deliveryPersonId,
      status: OrderStatus.DELIVERED,
      updatedAt: {
        gte: startOfDay,
      },
    },
    include: {
      delivery: true, // Para pegarmos os tempos de pickedUp e delivered
    },
  });

  // 1. Cálculos de Ganhos e Quantidades por Área
  const stats = deliveries.reduce(
    (acc, order) => {
      const fee = Number(order.deliveryFee) || 0;
      acc.totalEarnings += fee;

      // Lógica para contar por tipo de área (baseado no seu JSON deliveryAddress)
      const address = order.deliveryAddress as any;
      const area = address?.areaType?.toLowerCase();

      if (area === "urban") acc.urban++;
      else if (area === "rural") acc.rural++;
      else if (area === "district") acc.district++;

      // Cálculo para Tempo Médio (em minutos)
      if (order.delivery?.pickedUpAt && order.delivery?.deliveredAt) {
        const duration =
          (order.delivery.deliveredAt.getTime() -
            order.delivery.pickedUpAt.getTime()) /
          60000;
        acc.totalMinutes += duration;
        acc.timedOrders++;
      }

      return acc;
    },
    {
      totalEarnings: 0,
      urban: 0,
      rural: 0,
      district: 0,
      totalMinutes: 0,
      timedOrders: 0,
    },
  );

  const avgTime =
    stats.timedOrders > 0
      ? Math.round(stats.totalMinutes / stats.timedOrders)
      : 0;

  return {
    earnings: stats.totalEarnings,
    deliveries: {
      urban: stats.urban,
      rural: stats.rural,
      district: stats.district,
      total: deliveries.length,
    },
    avgDeliveryTime: avgTime,
  };
}
