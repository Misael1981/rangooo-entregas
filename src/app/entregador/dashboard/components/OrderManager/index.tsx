"use client";

import { OrderDTO } from "@/dtos/delivery-person.dto";
import { getPusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import OrderCard from "../OrderCard";
import DialogRejectOrder from "../DialogRejectOrder";

type OrderManagerProps = {
  orders: OrderDTO[];
  deliveryPersonId: string | undefined;
  currentRejections: number | undefined;
};

const OrderManager = ({
  orders,
  deliveryPersonId,
  currentRejections,
}: OrderManagerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpenDialogReject, setOpenDialogReject] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const pusher = getPusherClient();
    const channel = pusher.subscribe("delivery-orders");

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("✅ CONECTADO ao canal delivery-orders!");
    });

    channel.bind("order:created", (data: unknown) => {
      console.log("🔔 EVENTO RECEBIDO!", data);
      router.refresh();
    });

    pusher.connection.bind("error", (err: unknown) => {
      console.error("❌ Erro de conexão Pusher:", err);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("delivery-orders");
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
    setOpenDialogReject(true);
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
        onSkip={handleNext}
      />

      <DialogRejectOrder
        open={isOpenDialogReject}
        onOpenChange={() => setOpenDialogReject(!isOpenDialogReject)}
        deliveryPersonId={deliveryPersonId!}
        orderId={orders[currentIndex].id}
        currentRejections={currentRejections}
      />
    </div>
  );
};

export default OrderManager;
