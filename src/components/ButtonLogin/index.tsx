import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const ButtonLogin = () => {
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleGoogleLogin = () => {
    if (!termosAceitos) return;

    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="space-y-1 w-full">
      <Button
        disabled={!termosAceitos}
        className="w-full"
        onClick={handleGoogleLogin}
      >
        <Chrome className="h-5 w-5" />
        Entrar com Google
      </Button>
      <div className="flex items-start space-x-2 p-2 rounded-md text-white/60">
        <Checkbox
          id="terms"
          checked={termosAceitos}
          onCheckedChange={(checked) => setTermosAceitos(checked as boolean)}
          className="mt-1"
        />
        <label
          htmlFor="terms"
          className="text-sm leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Eu li e aceito os{" "}
          <Link href="/termos" className="text-primary font-semibold underline">
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
  );
};

export default ButtonLogin;
