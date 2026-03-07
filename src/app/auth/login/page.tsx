"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome } from "lucide-react"; // Ícone para o Google
import Link from "next/link";

export default function LoginPage() {
  const [termosAceitos, setTermosAceitos] = useState(false);

  const handleGoogleLogin = () => {
    if (!termosAceitos) return;
    // Inicia o login e redireciona para a página de verificação de perfil
    signIn("google", { callbackUrl: "/verificar-perfil" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Rangooo Entregas</CardTitle>
          <CardDescription>
            Faça login para começar a realizar entregas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            variant="outline"
            className="w-full h-12 flex gap-2 items-center justify-center border-2"
            onClick={handleGoogleLogin}
            disabled={!termosAceitos}
          >
            <Chrome className="h-5 w-5" />
            Entrar com Google
          </Button>

          <div className="flex items-start space-x-2 p-2 rounded-md">
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
            <p className="text-xs text-center text-muted-foreground italic">
              * Você precisa aceitar os termos para prosseguir.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
