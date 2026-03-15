import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import OrderManager from "./components/OrderManager";
import { getAvailableOrders } from "@/data/get-available-orders";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await getDeliveryPersonByUserId(session.user.id);

  if (!deliveryPerson) return <LandingPage />;

  const deliveryPersonId = deliveryPerson.id;

  const rawOrders = await getAvailableOrders({ deliveryPersonId });

  const orders = rawOrders.map((order) => ({
    ...order,
    totalAmount: Number(order.totalAmount),
    deliveryFee: Number(order.deliveryFee),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
  }));

  const isOnline = deliveryPerson.isOnline;

  if (!isOnline) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center p-10 text-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">Você está offline!</p>
          <p className="text-xs text-gray-400 mt-2">
            Fique online para receber notificações.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-background w-full text-foreground flex justify-center">
      <div className="container p-4 max-w-lg flex flex-col gap-6">
        <OrderManager
          orders={orders}
          deliveryPersonId={deliveryPerson?.id}
          currentRejections={
            deliveryPerson?.deliverySessions[0]?.rejectionsCount || 0
          }
        />
      </div>
    </div>
  );
}
