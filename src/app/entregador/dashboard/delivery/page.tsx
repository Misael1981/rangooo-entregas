import LandingPage from "@/components/LandingPage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import NoActiveDelivery from "./components/NoActiveDelivery";
import ActiveDeliveryCard from "./components/ActiveDeliveryCard";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { getActiveOrders } from "@/data/get-active-orders-by-deliveryPersonId";

export default async function DeliveryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  if (!deliveryPerson) return <LandingPage />;

  const activeOrders = await getActiveOrders(deliveryPerson.id);

  if (!activeOrders || activeOrders.length === 0) {
    return <NoActiveDelivery />;
  }

  return (
    <section className="flex flex-col gap-6 py-4">
      {activeOrders.map((order) => (
        <ActiveDeliveryCard
          key={order.id}
          order={order}
          deliveryPersonId={deliveryPerson?.id}
        />
      ))}
    </section>
  );
}
