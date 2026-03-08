import RegistrationForm from "./components/RegistrationForm";

export default function CadastroEntregadorPage() {
  return (
    <div className="min-h-screen bg-background flex w-full items-center justify-center text-foreground">
      <div className="container p-4 max-w-lg flex flex-col justify-center items-center gap-6">
        <header className="space-y-3">
          <h1 className="text-2xl font-semibold">Cadastro de Entregador</h1>
          <p className="text-muted-foreground">
            Preencha algumas informações básicas para solicitar seu cadastro
            como entregador na plataforma.
          </p>
          <p className="text-muted-foreground">
            Após o envio, nossa equipe fará uma breve análise dos seus dados
            para garantir a segurança dos estabelecimentos, clientes e da
            plataforma.
          </p>
          <p className="text-muted-foreground">
            Assim que seu cadastro for aprovado, você terá acesso ao
            <strong> painel de pedidos</strong> para começar a realizar
            entregas.
          </p>
        </header>
        <RegistrationForm />
      </div>
    </div>
  );
}
