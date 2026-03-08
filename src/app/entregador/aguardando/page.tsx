import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Clock, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AguardandoAprovacao() {
  return (
    <div className="flex bg-background min-h-screen flex-col items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-t-4 border-t-yellow-500 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
            <Clock className="h-8 w-8 text-yellow-600 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Cadastro em Análise
          </CardTitle>
          <CardDescription>
            Recebemos seus dados, agora é com a nossa equipe!
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-sm">Documentos Enviados</p>
                <p className="text-xs text-muted-foreground">
                  Sua CNH e dados do veículo foram registrados.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-yellow-500">
                <span className="text-[10px] font-bold text-yellow-600">2</span>
              </div>
              <div>
                <p className="font-medium text-sm text-yellow-700">
                  Validação de Segurança
                </p>
                <p className="text-xs text-muted-foreground">
                  Estamos conferindo a autenticidade das informações.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 opacity-50">
              <ShieldCheck className="mt-1 h-5 w-5 text-slate-400" />
              <div>
                <p className="font-medium text-sm">Acesso Liberado</p>
                <p className="text-xs text-muted-foreground">
                  Você receberá uma notificação assim que for aprovado.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-xs text-blue-700 font-medium">
              O prazo médio de aprovação é de{" "}
              <strong>24 a 48 horas úteis</strong>.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button variant="outline" asChild className="w-full">
              <Link
                href="mailto:suporte@rangooo.com.br"
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Falar com Suporte
              </Link>
            </Button>

            <p className="text-[10px] text-center text-muted-foreground italic">
              Dúvidas? Entre em contato mencionando seu CPF cadastrado.
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">
        Logado como: <strong>Misael</strong> (Sair)
      </p>
    </div>
  );
}
