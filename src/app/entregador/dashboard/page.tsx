import HeaderDeliveryPerson from "@/components/HeaderDeliveryPerson";
import LandingPage from "@/components/LandingPage";
import { getDeliveryPersonByUserId } from "@/data/get-delivery-person-by-id";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return <LandingPage />;
  }

  const id = session?.user?.id;

  const deliveryPerson = await getDeliveryPersonByUserId(id);
  console.log("Dados do entregador: ", deliveryPerson);

  return (
    <>
      <div className="min-h-screen bg-background w-full text-foreground flex justify-center">
        <div className="container p-4 max-w-lg flex flex-col gap-6">
          <HeaderDeliveryPerson
            image={session.user.image}
            name={session?.user?.name}
            isOnline={deliveryPerson?.isOnline}
            deliveryPersonId={deliveryPerson?.id}
          />
          <h1>Entregador Dashboard</h1>
        </div>
      </div>
    </>
  );
}
