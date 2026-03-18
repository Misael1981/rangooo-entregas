import { getServerSession } from "next-auth";
import SummaryCard from "./components/SummaryCard";
import { authOptions } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { getDeliverySummary } from "@/data/get-delivery-stats";
import { OnlineTimer } from "./components/OnlineTimer";
import { formatCurrency } from "@/helpers/format-currency";
import PixApp from "./components/PixApp";
import DialogFinishDay from "@/components/DialogFinishDay";

export default async function SummaryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  if (!deliveryPerson) return <LandingPage />;

  const stats = await getDeliverySummary(deliveryPerson.id);

  const totalDeliveries =
    stats.deliveries.urban + stats.deliveries.rural + stats.deliveries.district;

  const sessionStart = stats.sessionStart
    ? new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date(stats.sessionStart))
    : "--:--";

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Painel de Atividade</h1>

      {/* Sessão */}
      <SummaryCard
        title="Sessão Atual"
        stats={[
          { label: "Início da Sessão", value: sessionStart },
          {
            label: "Tempo Online",
            value: stats.sessionStart ? (
              <OnlineTimer startTime={stats.sessionStart} />
            ) : (
              "--"
            ),
          },
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
          { label: "Pedidos Negados", value: stats.rejections },
          {
            label: "Taxa de Aceitação",
            value: `${stats.acceptanceRate}%`,
          },
          {
            label: "Tempo Médio",
            value: `${stats.avgDeliveryTime} min`,
          },
          {
            label: "Taxa do Aplicativo",
            value: formatCurrency(stats.appFee),
          },
          {
            label: "Ganhos da Sessão",
            value: `R$ ${stats.earnings.toFixed(2)}`,
          },
        ]}
      />

      <PixApp />

      <DialogFinishDay
        totalDeliveries={totalDeliveries}
        sessionEarnings={stats.earnings}
        appFee={stats.appFee}
        deliveryPersonId={deliveryPerson.id}
      />
    </div>
  );
}
//sessionEarnings
