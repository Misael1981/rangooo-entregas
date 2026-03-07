import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function VerificarPerfilPage() {
  const session = await getServerSession();

  if (!session?.user?.email) redirect("/auth/login");

  const user = await prisma.user.findUnique({
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
