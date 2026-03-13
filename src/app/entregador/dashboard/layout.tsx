import HeaderDeliveryPerson from "@/components/HeaderDeliveryPerson";
import LandingPage from "@/components/LandingPage";
import PageLinks from "@/components/PageLinks";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return <LandingPage />;

  const deliveryPerson = await db.deliveryPerson.findUnique({
    where: { userId: session.user.id },
    select: { id: true, isOnline: true },
  });

  return (
    <div className="flex flex-col h-screen bg-background w-full text-foreground">
      <HeaderDeliveryPerson
        image={session.user.image}
        name={session?.user?.name}
        isOnline={deliveryPerson?.isOnline}
        deliveryPersonId={deliveryPerson?.id}
      />
      <PageLinks />

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
