"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

const PixApp = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Puxamos a chave do seu .env
    const pixKey = process.env.NEXT_PUBLIC_CHAVE_PIX;

    if (!pixKey) {
      console.error("Chave PIX não encontrada no .env");
      return;
    }

    try {
      await navigator.clipboard.writeText(pixKey);

      // Feedback visual
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar:", err);
    }
  };

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-xl font-semibold">Pix Aplicativo</h3>
        <p className="text-xs text-gray-400">
          Lembre-se, a taxa do aplicativo deve ser enviada ao final de cada
          sessão, podendo levar ao bloqueio do usuário no aplicativo.
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant={copied ? "default" : "outline"}
          onClick={handleCopy}
          className="w-full sm:w-auto transition-all"
        >
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Chave Copiada!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" />
              Copiar Chave PIX
            </>
          )}
        </Button>
      </div>
    </section>
  );
};

export default PixApp;
