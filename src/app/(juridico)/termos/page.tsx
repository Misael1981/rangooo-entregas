import NavigationButton from "@/components/NavigationButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function TermosDeUso() {
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  return (
    <div className="container  bg-background mx-auto pb-10 pt-4 px-4 max-w-4xl">
      <div className="mb-4">
        <NavigationButton />
      </div>
      <div className="flex flex-col mb-8 gap-4">
        <h1 className="text-3xl  font-bold tracking-tight text-primary">
          Termos de Uso - Rangooo Entregas
        </h1>
        <p className="text-muted-foreground">Última atualização: {dataAtual}</p>
      </div>

      <ScrollArea className="h-[60vh] rounded-md border p-6 bg-card text-card-foreground shadow-sm">
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <p>
              Estes Termos de Uso regulam a utilização do aplicativo{" "}
              <strong>Rangooo Entregas</strong>, parte do ecossistema Rangooo,
              destinado a conectar estabelecimentos comerciais, clientes e
              entregadores independentes.
            </p>
            <p className="font-medium text-destructive">
              Ao acessar o aplicativo, você declara ter lido, compreendido e
              concordado com estes termos. Caso não concorde, a utilização da
              plataforma deve ser interrompida imediatamente.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold">1. Sobre a Plataforma</h2>
            <p>
              O Rangooo Entregas é uma ferramenta tecnológica de intermediação.
              O Rangooo <strong>não realiza entregas diretamente</strong>, não
              possui frota própria e não controla o comportamento dos
              entregadores em tempo real fora da plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary">
              2. Natureza da Relação (Inexistência de Vínculo)
            </h2>
            <div className="bg-muted p-4 rounded-lg border-l-4 border-primary">
              <p className="font-bold">
                O entregador declara estar ciente de que:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Não é funcionário ou subordinado ao Rangooo;</li>
                <li>
                  Não recebe salário, mas sim o valor acordado por entrega
                  realizada;
                </li>
                <li>Possui total autonomia de horários e escolha de rotas;</li>
                <li>
                  É o único responsável pelo seu veículo (manutenção,
                  combustível e seguro).
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              3. Responsabilidade e Custódia do Pedido
            </h2>
            <p>
              Ao aceitar uma entrega, o entregador assume a{" "}
              <strong>custódia do produto</strong>. Ele é responsável por:
            </p>
            <ul className="list-disc ml-6">
              <li>Verificar se o pedido está lacrado na retirada;</li>
              <li>Garantir a integridade térmica e física do produto;</li>
              <li>
                Realizar a entrega exclusivamente no endereço indicado no app.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              4. Geolocalização e Dados (LGPD)
            </h2>
            <p>
              Para o funcionamento do Rangooo Entregas, o usuário autoriza a
              coleta de sua <strong>posição geográfica em tempo real</strong>{" "}
              enquanto o aplicativo estiver em uso ou em segundo plano (durante
              uma entrega ativa). Estes dados são usados para:
            </p>
            <ul className="list-disc ml-6">
              <li>Informar ao cliente a previsão de chegada;</li>
              <li>Calcular a viabilidade de novas entregas próximas;</li>
              <li>Garantir a segurança e auditoria do processo de entrega.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">5. Conduta e Fraudes</h2>
            <p>É estritamente proibido:</p>
            <ul className="list-disc ml-6">
              <li>Simular entregas (dar baixa sem entregar);</li>
              <li>Compartilhar conta com terceiros;</li>
              <li>
                Utilizar dados de clientes para contatos externos não
                autorizados.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-destructive">
              6. Penalidades
            </h2>
            <p>
              O descumprimento de qualquer cláusula poderá resultar em suspensão
              temporária ou <strong>banimento definitivo</strong> sem aviso
              prévio, dependendo da gravidade (como furtos ou agressões).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold">7. Alterações</h2>
            <p>
              O Rangooo pode atualizar estes termos periodicamente. O uso
              continuado do app após as alterações constitui aceitação tácita.
            </p>
          </section>
        </div>
      </ScrollArea>

      <div className="mt-6 flex justify-end text-sm text-muted-foreground italic">
        © {new Date().getFullYear()} Rangooo - Tecnologia para Entregas
        Independentes.
      </div>
    </div>
  );
}
