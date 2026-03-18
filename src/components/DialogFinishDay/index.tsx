"use client";

import { useState } from "react"; // Precisamos para controlar o fechar/abrir
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "../ui/card";
import { formatCurrency } from "@/helpers/format-currency";
import { Loader2 } from "lucide-react"; // Para um feedback de carregamento
import { toggleOnlineStatus } from "@/app/actions/delivery-actions";

type DialogFinishDayProps = {
  deliveryPersonId: string; // Precisamos do ID pra desligar no banco
  totalDeliveries: number;
  sessionEarnings: number;
  appFee: number;
};

const DialogFinishDay = ({
  deliveryPersonId,
  totalDeliveries,
  sessionEarnings,
  appFee,
}: DialogFinishDayProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFinishSession = async () => {
    setLoading(true);
    try {
      // Chamamos a função que a gente já tinha, passando false para isOnline
      await toggleOnlineStatus(deliveryPersonId, false);

      setOpen(false); // Fecha o modal
    } catch (error) {
      console.error("Erro ao fechar sessão:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Encerrar Sessão
        </Button>
      </DialogTrigger>

      <DialogContent className="w-sm max-w-[95%] text-accent-foreground">
        <DialogHeader>
          <DialogTitle className="text-red-600">Encerrar Sessão</DialogTitle>
          <DialogDescription>
            Deseja encerrar sua sessão de hoje?
          </DialogDescription>
          <DialogDescription className="text-xs">
            Antes de finalizar, não se esqueça de deixar a taxa do aplicativo em
            dia para começar amanhã sem preocupações. Bom descanso!
          </DialogDescription>
        </DialogHeader>

        <Card className="p-4 space-y-2 bg-muted/50">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total de Entregas</span>
            <span className="font-medium">{totalDeliveries}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Ganhos da Sessão</span>
            <span className="font-medium text-green-600">
              {formatCurrency(sessionEarnings)}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t pt-2">
            <span className="text-gray-500">Taxa do Aplicativo</span>
            <span className="font-medium text-red-500">
              {formatCurrency(appFee)}
            </span>
          </div>
        </Card>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Voltar
          </Button>
          <Button
            variant="destructive"
            onClick={handleFinishSession}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirmar Encerramento"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogFinishDay;
