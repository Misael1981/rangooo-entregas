import { db } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DailyStats {
  data: string;
  numbersDelivery: number;
  onlineTime: number;
  earnings: number;
  appFee: number;
  isPaid: boolean;
}

export async function getMonthlyHistory(deliveryPersonId: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const rawSessions = await db.deliverySession.findMany({
    where: {
      deliveryPersonId,
      date: { gte: thirtyDaysAgo },
    },
    orderBy: { date: "desc" },
  });

  const grouped = rawSessions.reduce<Record<string, DailyStats>>(
    (acc, session) => {
      const dateKey = format(new Date(session.date), "dd/MM", { locale: ptBR });

      if (!acc[dateKey]) {
        acc[dateKey] = {
          data: dateKey,
          numbersDelivery: 0,
          onlineTime: 0,
          earnings: 0,
          appFee: 0,
          isPaid: true,
        };
      }

      acc[dateKey].numbersDelivery += session.ordersCompleted || 0;
      acc[dateKey].earnings += Number(session.totalEarnings) || 0;
      acc[dateKey].appFee += Number(session.totalFeeToPay) || 0;

      if (!session.isPaid) acc[dateKey].isPaid = false;

      const end = session.endTime ? new Date(session.endTime) : new Date();
      const duration =
        (end.getTime() - new Date(session.startTime).getTime()) / 60000;
      acc[dateKey].onlineTime += Math.max(0, duration);

      return acc;
    },
    {},
  );

  return Object.values(grouped).map((day) => ({
    ...day,
    onlineTime: formatMinutes(day.onlineTime),
  }));
}

function formatMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60);
  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}
