import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import DayCard from "./components/DayCard";
import { getMonthlyHistory } from "@/data/get-monthly-history";

export default async function MetricsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  if (!deliveryPerson) return <LandingPage />;

  const sessions = await getMonthlyHistory(deliveryPerson.id);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Desempenho Mensal</h1>
        <p className="text-xs text-gray-400">
          Um resumo sobre suas atividades nos últimos 30 dias.
        </p>
      </div>
      {sessions.map((day) => (
        <DayCard key={day.data} day={day} />
      ))}
      {sessions.length === 0 && (
        <p>Você ainda não realizou entregas nos últimos 30 dias.</p>
      )}
    </div>
  );
}
