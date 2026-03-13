import { ConsumptionMethod, OrderStatus } from "@/generated/prisma/enums";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface DeliveryAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  complement?: string | null;
}

type ActiveDeliveryCardProps = {
  order: {
    totalAmount: number;
    deliveryFee: number;
    createdAt: string;
    deliveryAddress: DeliveryAddress;
    user: {
      name: string;
    };
    restaurant: {
      number: string | null;
      name: string;
      avatarImageUrl: string | null;
      neighborhood: string | null;
      street: string | null;
    };
    id: string;
    userId: string;
    status: OrderStatus;
    updatedAt: Date;
    restaurantId: string;
    customName: string | null;
    extras: string | null;
    orderNumber: number | null;
    printId: string | null;
    paymentMethod: string | null;
    consumptionMethod: ConsumptionMethod;
  };
  deliveryPersonId: string | undefined;
};

const ActiveDeliveryCard = ({
  order,
  deliveryPersonId,
}: ActiveDeliveryCardProps) => {
  const address = order.deliveryAddress as DeliveryAddress;
  const formattedDate = new Date(order.createdAt).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!deliveryPersonId) {
    throw new Error("Entregador não selecionado");
  }

  return (
    <div className="min-h-screen bg-background w-full text-foreground flex justify-center">
      <div className="container p-4 max-w-lg flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{order.restaurant.name}</CardTitle>
                <CardDescription>
                  {order.restaurant.street} - {order.restaurant.number} -{" "}
                  {order.restaurant.neighborhood}
                </CardDescription>
              </div>
              <div className="relative w-10 h-10">
                <Image
                  src={order.restaurant.avatarImageUrl || "/logo.png"}
                  alt="A description of the image"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span>{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-lg">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-muted-foreground font-bold">
                  Cliente
                </span>
                <h3 className="font-semibold text-sm">{order.user.name}</h3>
              </div>
              <Badge
                variant="secondary"
                className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none"
              >
                {address?.city || "Zona de Entrega"}
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase text-muted-foreground font-bold">
                Endereço de Entrega
              </p>

              {address && address.street ? (
                <div className="text-sm border-l-2 border-green-500 pl-3 py-1">
                  <p className="font-medium">
                    {address.street}, {address.number}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {address.neighborhood}
                  </p>
                  {address.complement && (
                    <p className="text-[10px] text-blue-600 italic">
                      Ref: {address.complement}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-destructive text-xs font-medium">
                  ⚠️ Dados de endereço pendentes
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t items-center pt-5">
            <Button>Sair para entrega</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ActiveDeliveryCard;
