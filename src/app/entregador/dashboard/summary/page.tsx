import { getServerSession } from "next-auth";
import SummaryCard from "./components/SummaryCard";
import { authOptions } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { getDeliverySummary } from "@/data/get-delivery-stats";

export default async function SummaryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  if (!deliveryPerson) return <LandingPage />;

  const stats = await getDeliverySummary(deliveryPerson.id);

  console.log(stats);

  const mockedstats = {
    sessionStart: "14/03/2026 18:42",
    onlineTime: "2h 17min",

    deliveries: {
      urban: 9,
      rural: 3,
      district: 2,
    },

    refusedOrders: 2,

    metrics: {
      acceptanceRate: 87,
      avgDeliveryTime: 21,
      earnings: 148.5,
      distance: 37,
    },
  };

  const totalDeliveries =
    stats.deliveries.urban + stats.deliveries.rural + stats.deliveries.district;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Painel de Atividade</h1>

      {/* Sessão */}
      <SummaryCard
        title="Sessão Atual"
        stats={[
          { label: "Início da Sessão", value: mockedstats.sessionStart },
          { label: "Tempo Online", value: mockedstats.onlineTime },
          { label: "Total de Entregas", value: totalDeliveries },
        ]}
      />

      {/* Tipos de Entrega */}
      <SummaryCard
        title="Entregas por Tipo"
        stats={[
          { label: "Área Urbana", value: stats.deliveries.urban },
          { label: "Zona Rural", value: stats.deliveries.rural },
          { label: "Zona Distrital", value: stats.deliveries.district },
        ]}
      />

      {/* Estatística*/}
      <SummaryCard
        title="Estatísticas"
        stats={[
          { label: "Pedidos Negados", value: mockedstats.refusedOrders },
          {
            label: "Taxa de Aceitação",
            value: `${mockedstats.metrics.acceptanceRate}%`,
          },
          {
            label: "Tempo Médio",
            value: `${stats.avgDeliveryTime} min`,
          },
          {
            label: "Ganhos da Sessão",
            value: `R$ ${stats.earnings.toFixed(2)}`,
          },
        ]}
      />
    </div>
  );
}
