"use client";

import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import OrderCard from "../OrderCard";
import { ConsumptionMethod, OrderStatus } from "@/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";

interface DeliveryAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  complement?: string | null;
}

type OrderManagerProps = {
  orders: {
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
  }[];
  deliveryPersonId: string | undefined;
};

const OrderManager = ({ orders, deliveryPersonId }: OrderManagerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    console.log("📡 Tentando conectar ao Pusher...");

    const channel = pusherClient.subscribe("delivery-orders");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("✅ CONECTADO ao canal delivery-orders!");
    });

    channel.bind("new-order", (data: OrderManagerProps) => {
      console.log("🔔 EVENTO RECEBIDO!", data);
      router.refresh();
    });

    pusherClient.connection.bind("error", (err: unknown) => {
      console.error("❌ Erro de conexão Pusher:", err);
    });

    return () => {
      pusherClient.unsubscribe("delivery-orders");
    };
  }, [router]);

  if (!orders || orders.length === 0 || currentIndex >= orders.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center p-10 text-center rounded-lg border border-dashed">
          <p className="text-muted-foreground">
            Nenhum pedido novo por enquanto... ☕
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Fique online para receber notificações.
          </p>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-2 h-full justify-center">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-bold text-gray-500 uppercase">
          Fila de Espera
        </span>
        <Badge variant="outline">
          {currentIndex + 1} / {orders.length}
        </Badge>
      </div>

      <OrderCard
        order={orders[currentIndex]}
        deliveryPersonId={deliveryPersonId}
        onSkip={handleNext} // Nova prop para pular
      />
    </div>
  );
};

export default OrderManager;
