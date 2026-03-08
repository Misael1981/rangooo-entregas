import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AlertCircle,
  FileX2,
  MessageSquareText,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CadastroReprovado() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 pt-12 pb-2">
      <Card className="w-full max-w-md border-t-4 border-t-destructive shadow-xl bg-card">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <FileX2 className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Cadastro Não Aprovado
          </CardTitle>
          <CardDescription className="text-muted-foreground italic">
            Não foi possível validar sua conta neste momento.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">
                  Motivo da análise:
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Geralmente isso ocorre devido a fotos de documentos ilegíveis,
                  divergência nos dados do veículo ou CPF irregular.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>O que você pode fazer agora?</strong>
            </p>
            <ul className="list-disc ml-5 space-y-2">
              <li>Verificar se os dados enviados estão corretos.</li>
              <li>Entrar em contato com nosso suporte para contestação.</li>
              <li>Aguardar o prazo de 30 dias para uma nova tentativa.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="default"
              asChild
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Link
                href="https://wa.me/5535999110933"
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquareText className="h-4 w-4" />
                Falar com Suporte no WhatsApp
              </Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="w-full text-muted-foreground"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar para o Início
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <p className="mt-2 text-xs text-muted-foreground text-center max-w-62">
        Rangooo Tecnologia - Garantindo a segurança de todos os nossos
        parceiros.
      </p>
    </div>
  );
}
