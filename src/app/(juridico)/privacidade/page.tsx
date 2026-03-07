import NavigationButton from "@/components/NavigationButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, MapPin, Share2, Lock } from "lucide-react";

export default function PoliticaPrivacidade() {
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="container bg-background mx-auto pt-4 pb-10 px-4 max-w-4xl">
      <div className="mb-4">
        <NavigationButton />
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Política de Privacidade - Rangooo
          </h1>
        </div>
        <p className="text-muted-foreground">Última atualização: {dataAtual}</p>
      </div>

      <ScrollArea className="h-[60vh] rounded-md border p-6 bg-card text-card-foreground shadow-sm">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 pb-6">
          <section>
            <p>
              A presente Política de Privacidade descreve como o{" "}
              <strong>Rangooo</strong> coleta, utiliza, armazena e protege as
              informações dos usuários, incluindo o aplicativo{" "}
              <strong>Rangooo Entregas</strong>.
            </p>
            <p>
              A privacidade e a proteção dos seus dados pessoais são prioridades
              para nós. Ao utilizar nossa plataforma, você declara estar ciente
              das práticas descritas abaixo.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Lock className="h-5 w-5" /> 1. Dados Coletados
            </h2>
            <p>
              Para o funcionamento da plataforma e segurança de todos os
              envolvidos, coletamos os seguintes dados dos entregadores:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Identificação:</strong> Nome completo, CPF e fotografia
                de perfil.
              </li>
              <li>
                <strong>Contato:</strong> Número de telefone e e-mail.
              </li>
              <li>
                <strong>Veículo:</strong> Placa e modelo do veículo utilizado
                nas entregas.
              </li>
            </ul>
          </section>

          <section className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
              <MapPin className="h-5 w-5" /> 2. Coleta de Geolocalização
            </h2>
            <p className="mt-2">
              O aplicativo coleta dados de localização em tempo real para:
            </p>
            <ul className="list-disc ml-6 space-y-1 mt-2 italic">
              <li>Permitir o acompanhamento da entrega pelo cliente final;</li>
              <li>Informar ao estabelecimento o progresso do pedido;</li>
              <li>Otimizar a logística e segurança do entregador.</li>
            </ul>
            <p className="mt-2 text-sm">
              <strong>Nota:</strong> A localização poderá ser coletada em
              segundo plano apenas enquanto houver uma entrega ativa.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Share2 className="h-5 w-5" /> 3. Compartilhamento de Informações
            </h2>
            <p>
              O Rangooo <strong>não comercializa</strong> seus dados pessoais. O
              compartilhamento ocorre apenas para viabilizar a entrega:
            </p>
            <ul className="list-disc ml-6">
              <li>
                <strong>Estabelecimentos:</strong> Recebem seu nome e telefone
                para coordenação da coleta.
              </li>
              <li>
                <strong>Clientes:</strong> Recebem seu nome, foto e localização
                em tempo real após a saída do pedido.
              </li>
              <li>
                <strong>Autoridades:</strong> Caso haja requisição legal ou
                investigação de fraudes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              4. Segurança e Armazenamento
            </h2>
            <p>
              Utilizamos infraestrutura de ponta (Neon/PostgreSQL) com
              criptografia de dados e controles rigorosos de acesso. Embora
              nenhum sistema seja 100% invulnerável, trabalhamos continuamente
              para manter seus dados sob proteção máxima.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">
              5. Seus Direitos (LGPD)
            </h2>
            <p>Você possui direitos garantidos por lei, incluindo:</p>
            <ul className="list-disc ml-6">
              <li>Acesso e correção de dados;</li>
              <li>Exclusão da conta e anonimização de dados pessoais;</li>
              <li>Revogação de consentimentos.</li>
            </ul>
            <p className="mt-2 text-sm italic">
              Para exercer esses direitos, utilize os canais de suporte no
              aplicativo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">6. Retenção de Dados</h2>
            <p>
              Mesmo após a exclusão da conta, poderemos manter registros
              históricos por períodos determinados por lei para fins de
              auditoria, prevenção de fraudes e cumprimento de obrigações
              fiscais.
            </p>
          </section>
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-between items-center text-sm text-muted-foreground italic">
        <p>Rangooo Tecnologia LTDA</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
