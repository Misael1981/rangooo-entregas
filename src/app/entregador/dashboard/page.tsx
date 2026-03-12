import HeaderDeliveryPerson from "@/components/HeaderDeliveryPerson";
import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getAvailableOrders } from "@/app/actions/get-available-orders";
import OrderManager from "./components/OrderManager";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);
  const rawOrders = await getAvailableOrders();

  const orders = rawOrders.map((order) => ({
    ...order,
    totalAmount: Number(order.totalAmount),
    deliveryFee: Number(order.deliveryFee),
    createdAt: order.createdAt.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-background w-full text-foreground flex justify-center">
      <div className="container p-4 max-w-lg flex flex-col gap-6">
        <HeaderDeliveryPerson
          image={session.user.image}
          name={session?.user?.name}
          isOnline={deliveryPerson?.isOnline}
          deliveryPersonId={deliveryPerson?.id}
        />

        <OrderManager orders={orders} deliveryPersonId={deliveryPerson?.id} />
      </div>
    </div>
  );
}
