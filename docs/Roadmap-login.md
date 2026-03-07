O Fluxo Lógico (Roadmap)
Tela de Auth: Botão "Entrar com Google" + Checkbox obrigatória de "Aceito os Termos".

NextAuth Callback: O usuário loga. O NextAuth cria o registro básico na tabela User.

Middleware/Redirect: O sistema checa:

O perfil está completo? (isProfileCompleted)

Já existe um DeliveryPerson vinculado?

Se não, manda para o formulário de Cadastro de Entregador (o seu "Lead").

Aprovação: O admin (você) aprova no banco, muda o status para ACTIVE e o cara ganha acesso à dashboard.

🔨 Ajuste no Schema (O "Lead" do Entregador)
Como você já tem o LeadApplication para restaurantes, vamos usar o DeliveryPerson que já está no seu schema como o nosso "Lead". Ele já tem os campos status, approvedAt e document.

Dica: No seu schema, o DeliveryPerson tem status @default(PENDING). Isso já é perfeito para a fila de aprovação!

A página de verificação
Após o login, o Next.js redireciona para /verificar-perfil. Lá, você faz uma Server Component que decide o destino do caboclo:
