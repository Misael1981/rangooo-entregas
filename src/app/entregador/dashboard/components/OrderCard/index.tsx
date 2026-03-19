"use client";

import { acceptOrder } from "@/app/actions/accept-order";
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
import { areaTypes_label } from "@/constants/maps-labels";
import { DeliveryAddressDTO, OrderDTO } from "@/dtos/delivery-person.dto";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type OrderCardProps = {
  order: OrderDTO;
  deliveryPersonId: string | undefined;
  onSkip: () => void;
};

const OrderCard = ({ order, deliveryPersonId, onSkip }: OrderCardProps) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const address = order.deliveryAddress as DeliveryAddressDTO;
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

  const handleAccept = async () => {
    setIsAccepting(true);

    try {
      const result = await acceptOrder(order.id, deliveryPersonId);

      if (result.success) {
        toast.success("Pedido aceito! Vá até o restaurante. 🏁");
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error("Erro inesperado.");
      console.error(err);
    } finally {
      setIsAccepting(false);
    }
  };

  return (
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
            {address?.areaType
              ? areaTypes_label[address.areaType]
              : "Zona de Entrega"}
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
        <Button onClick={onSkip} variant="destructive">
          Rejeitar Pedido
        </Button>
        <Button
          onClick={handleAccept}
          disabled={isAccepting}
          className="bg-green-600 hover:bg-green-700"
        >
          {isAccepting ? "Processando..." : "Aceitar Pedido"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;
