"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "../ui/switch";
import { toast } from "sonner";
import { toggleOnlineStatus } from "@/app/actions/delivery-actions";

type SheetDeliveryPersonProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isOnline: boolean; // Removi o undefined para facilitar
  deliveryPersonId: string;
};

const SheetDeliveryPerson = ({
  open,
  onOpenChange,
  isOnline,
  deliveryPersonId,
}: SheetDeliveryPersonProps) => {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(isOnline);

  // Sincroniza o status se ele mudar externamente
  useEffect(() => {
    setCurrentStatus(isOnline);
  }, [isOnline]);

  const handleToggleStatus = async (checked: boolean) => {
    setLoading(true);
    try {
      // Aqui a gente chama a Action que abre/fecha a DeliverySession
      const result = await toggleOnlineStatus(deliveryPersonId, checked);

      if (result.success) {
        setCurrentStatus(checked);
        toast.success(
          checked
            ? "Você está online! Boas entregas. 🛵"
            : "Você ficou offline.",
        );
      } else {
        toast.error("Erro ao mudar status.");
      }
    } catch (error) {
      toast.error("Falha na conexão.");
      console.error("Erro ao mudar status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="h-full w-[95%] flex flex-col justify-between text-primary">
        <SheetHeader>
          <SheetTitle>Configurações de Perfil</SheetTitle>
          <SheetDescription>
            Gerencie sua disponibilidade para receber novos pedidos.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 py-10">
          <div className="flex items-center justify-between p-4 rounded-xl shadow-sm border">
            <div className="space-y-0.5">
              <Label htmlFor="online-mode" className="text-base font-semibold">
                Modo de Trabalho
              </Label>
              <p className="text-xs text-muted-foreground">
                {currentStatus
                  ? "Você está visível para lojas"
                  : "Você não receberá pedidos"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold uppercase ${currentStatus ? "text-green-500" : "text-red-500"}`}
              >
                {currentStatus ? "Online" : "Offline"}
              </span>
              <Switch
                id="online-mode"
                checked={currentStatus}
                onCheckedChange={handleToggleStatus}
                disabled={loading} // Evita cliques duplos enquanto o banco processa
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto">
          <SheetClose asChild>
            <Button className="w-full" variant="outline">
              Voltar ao Dashboard
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SheetDeliveryPerson;
