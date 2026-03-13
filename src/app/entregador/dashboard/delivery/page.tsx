import LandingPage from "@/components/LandingPage";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import NoActiveDelivery from "./components/NoActiveDelivery";
import ActiveDeliveryCard from "./components/ActiveDeliveryCard";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";

export default async function DeliveryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  const activeOrder = await db.order.findFirst({
    where: {
      deliveryPersonId: deliveryPerson?.id,
      status: {
        in: ["CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY"],
      },
    },
    include: {
      restaurant: true,
      user: true,
      items: true,
    },
  });

  console.log("Pedidos ativos:", activeOrder);
  console.log("ID do entregador:", session.user.id);

  if (!activeOrder) return <NoActiveDelivery />;

  return (
    <ActiveDeliveryCard
      order={activeOrder}
      deliveryPersonId={session.user.id}
    />
  );
}
