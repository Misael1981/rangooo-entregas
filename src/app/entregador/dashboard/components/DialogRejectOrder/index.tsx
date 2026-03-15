import { rejectOrder } from "@/app/actions/reject-order";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type DialogRejectOrderProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  deliveryPersonId: string;
  currentRejections: number | undefined;
};

const DialogRejectOrder = ({
  open,
  onOpenChange,
  orderId,
  deliveryPersonId,
  currentRejections,
}: DialogRejectOrderProps) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    if (!reason.trim()) return toast.error("Justifique a rejeição");

    setLoading(true);
    const result = await rejectOrder(orderId, deliveryPersonId, reason);
    setLoading(false);

    if (result.success) {
      toast.success("Pedido rejeitado com sucesso");
      onOpenChange(false);
      setReason("");
    } else {
      toast.error("Erro ao rejeitar");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] text-foreground w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Rejeitar Pedido</DialogTitle>
          <DialogDescription>
            Tem certeza que quer rejeitar este pedido? Você só pode rejeitar 3
            pedidos pedidos por sessão, e deve justificar a rejeição!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className="flex flex-col text-orange-400 justify-center items-center gap-1">
            <span>Pedidos Rejeitados na Sessão</span>
            <Badge
              variant="outline"
              className="text-orange-400 border-orange-400"
            >
              {currentRejections}{" "}
              {currentRejections === 1 ? "pedido" : "pedidos"}
            </Badge>
          </div>

          <div className="space-y-2">
            <Field>
              <Label htmlFor="reject-order">Justifique a Rejeição</Label>
              <Textarea
                id="reject-order"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ex: Pneu furado, muito longe..."
              />
            </Field>
          </div>
        </div>
        <DialogFooter className="flex-row gap-4 justify-between pt-4">
          <DialogClose asChild>
            <Button variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={loading || !reason.trim()}
          >
            {loading ? "Processando..." : "Confirmar Rejeição"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRejectOrder;
