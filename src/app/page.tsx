import LandingPage from "@/components/LandingPage";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <LandingPage />;
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: { deliveryPerson: true },
  });

  if (!user?.deliveryPerson) {
    redirect("/entregador/cadastro");
  }

  if (user.deliveryPerson.status === "PENDING") {
    redirect("/entregador/aguardando");
  }

  if (user.deliveryPerson.status === "REJECTED") {
    redirect("/entregador/rejeitado");
  }

  redirect("/entregador/dashboard");
}
