import { Bell, Clock, MapPin } from "lucide-react";
import Feature from "../Feature";
import Header from "../Header";
import Hero from "../Hero";
import About from "../About";
import CtaLogin from "../CtaLogin";
import Footer from "../Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Features */}
      <section className="border-t">
        <div className="max-w-105 mx-auto px-6 py-10 space-y-6">
          <Feature
            icon={<Bell className="h-5 w-5" />}
            title="Pedidos em tempo real"
            description="Receba notificações sempre que houver uma nova entrega disponível."
          />

          <Feature
            icon={<MapPin className="h-5 w-5" />}
            title="Navegação até o cliente"
            description="Acesse rapidamente o endereço do cliente e abra no GPS."
          />

          <Feature
            icon={<Clock className="h-5 w-5" />}
            title="Histórico de entregas"
            description="Acompanhe todas as entregas que você já realizou."
          />
        </div>
      </section>

      {/* About */}
      <About />

      {/* CTA */}
      <CtaLogin />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
