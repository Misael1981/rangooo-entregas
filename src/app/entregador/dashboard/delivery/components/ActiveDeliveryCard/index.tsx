"use client";

import { OrderStatus } from "@/generated/prisma/enums";
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
import { areaTypes_label } from "@/constants/maps-labels";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/helpers/format-currency";
import { useState } from "react";
import { updateOrderStatus } from "@/app/actions/update-order-status";
import { toast } from "sonner";
import {
  DeliveryAddressDTO,
  ItemsDTO,
  OrderDTO,
} from "@/dtos/delivery-person.dto";

type ActiveDeliveryCardProps = {
  order: OrderDTO;
  deliveryPersonId: string | undefined;
};

const ActiveDeliveryCard = ({
  order,
  deliveryPersonId,
}: ActiveDeliveryCardProps) => {
  const [isFinish, setIsFinish] = useState(false);
  const [loading, setLoading] = useState(false);

  const address = order.deliveryAddress as DeliveryAddressDTO;

  const formattedHours = new Date(order.createdAt).toLocaleString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!deliveryPersonId) {
    throw new Error("Entregador não selecionado");
  }

  const handleFinish = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!isFinish) {
        const result = await updateOrderStatus(
          order.id,
          OrderStatus.OUT_FOR_DELIVERY,
        );
        if (!result.success) {
          toast.error(result.error ?? "Erro ao enviar pedido para entrega");
          return;
        }
        toast.success("Pedido enviado para entrega");
        setIsFinish(true);
      } else {
        const result = await updateOrderStatus(order.id, OrderStatus.DELIVERED);
        if (!result.success) {
          toast.error(result.error ?? "Erro ao finalizar pedido");
          return;
        }
        toast.success("Pedido finalizado");
        setIsFinish(false);
      }
    } catch (error) {
      toast.error("Ocorreu um erro inesperado");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const result = await updateOrderStatus(order.id, OrderStatus.CANCELED);
      if (!result.success) {
        toast.error(result.error ?? "Erro ao cancelar pedido");
        return;
      }
      toast.success("Pedido cancelado");
    } catch (error) {
      toast.error("Ocorreu um erro inesperado");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full text-foreground flex justify-center">
      <div className="container p-4 max-w-lg flex flex-col gap-6">
        <Card className="overflow-hidden">
          <CardHeader className=" pb-4">
            <div className="flex justify-between items-center mb-4">
              <Badge variant="outline" className="text-xs font-mono">
                Nº {order.orderNumber}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-yellow-100 text-yellow-700 border-yellow-700"
              >
                {formattedHours}
              </Badge>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{order.restaurant.name}</CardTitle>
                <CardDescription>
                  {order.restaurant.street}, {order.restaurant.number} <br />
                  {order.restaurant.neighborhood}
                </CardDescription>
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src={order.restaurant.avatarImageUrl || "/logo.png"}
                  alt={order.restaurant.name}
                  fill
                  className="object-cover rounded-xl shadow-sm"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Seção do Cliente e Área */}
            <div className="flex justify-between items-center py-3 rounded-xl">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">
                  Entregar para
                </span>
                <h3 className="font-bold text-sm">{order.user.name}</h3>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 border-none px-3">
                {address?.areaType
                  ? areaTypes_label[address.areaType]
                  : "Zona de Entrega"}
              </Badge>
            </div>

            {/* Endereço Detalhado */}
            <div className="space-y-2">
              <p className="text-[10px] uppercase text-muted-foreground font-bold">
                Endereço de Destino
              </p>
              <div className="text-sm border-l-4 border-green-500 pl-4 py-1 rounded-r-lg">
                <p className="font-semibold text-base">
                  {address.street}, {address.number}
                </p>
                <p className="text-muted-foreground">
                  {address.neighborhood} - {address.city}
                </p>
                {address.complement && (
                  <p className="text-xs text-blue-600 mt-1 font-medium bg-blue-50 w-fit px-2 py-0.5 rounded">
                    Ref: {address.complement}
                  </p>
                )}
                {address.reference && (
                  <p className="text-xs text-blue-600 mt-1 font-medium bg-blue-50 w-fit px-2 py-0.5 rounded">
                    Ref: {address.reference}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* Resumo dos Itens */}
            <div className="space-y-3">
              <p className="text-[10px] uppercase text-muted-foreground font-bold">
                Resumo dos Itens
              </p>
              <div className="space-y-2">
                {order.items!.map((item: ItemsDTO, index: number) => (
                  <div key={index} className="flex justify-between text-sm ">
                    <span className="text-muted-foreground">
                      <strong className="text-foreground mr-2">
                        {item.quantity}x
                      </strong>{" "}
                      {item.customName || "Produto"}
                    </span>
                    <span className="font-medium">
                      {formatCurrency(
                        Number(item.priceAtOrder) * item.quantity,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totalizador */}
            <div className="bg-background/50 text-white p-4 rounded-xl flex justify-between items-center shadow-lg">
              <div>
                <p className="text-[10px] uppercase opacity-70 font-bold">
                  Total a receber
                </p>
                <p className="text-xs opacity-60">Taxa de entrega inclusa</p>
              </div>
              <p className="text-2xl font-black text-green-600">
                {formatCurrency(order.totalAmount)}
              </p>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-4 flex justify-between items-center border-t">
            <Button
              onClick={handleCancel}
              disabled={loading}
              variant="destructive"
            >
              Cancelar Pedido
            </Button>
            <Button onClick={handleFinish} disabled={loading}>
              {isFinish ? "Finalizar Pedido" : "Sair para Entrega"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ActiveDeliveryCard;
