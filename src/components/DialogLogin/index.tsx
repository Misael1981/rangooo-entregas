import { Chrome } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import { signIn } from "next-auth/react";

type DialogLoginProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogLogin = ({ isOpen, onOpenChange }: DialogLoginProps) => {
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleGoogleLogin = () => {
    if (!termosAceitos) return;

    signIn("google", { callbackUrl: "/verificar-perfil" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95%] text-primary">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Rangooo Entregas
          </DialogTitle>
          <DialogDescription>
            Faça login para começar a realizar entregas!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-12 space-y-2">
          <Button
            variant="outline"
            className="w-full h-12 flex gap-2 items-center justify-center border-2"
            onClick={handleGoogleLogin}
            disabled={!termosAceitos}
          >
            <Chrome className="h-5 w-5" />
            Entrar com Google
          </Button>
          <div className="flex items-start space-x-2 p-2 rounded-md ">
            <Checkbox
              id="terms"
              checked={termosAceitos}
              onCheckedChange={(checked) =>
                setTermosAceitos(checked as boolean)
              }
              className="mt-1"
            />
            <label
              htmlFor="terms"
              className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eu li e aceito os{" "}
              <Link
                href="/termos"
                className="text-primary font-semibold underline"
              >
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link
                href="/privacidade"
                className="text-primary font-semibold underline"
              >
                Política de Privacidade
              </Link>{" "}
              do Rangooo.
            </label>
          </div>
          {!termosAceitos && (
            <p className="text-xs text-center text-yellow-500 italic">
              * Você precisa aceitar os termos para prosseguir.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogLogin;
