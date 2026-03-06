import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="flex-1">
      <div className="max-w-105 mx-auto px-6 py-10 text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative w-24 h-24 bg-accent-foreground  p-5 rounded-lg">
            <Image src="/logo.png" alt="Delivery" fill objectFit="contain" />
          </div>
        </div>

        <h2 className="text-2xl text-primary font-bold mb-4">
          Receba pedidos e faça entregas com o Rangooo
        </h2>

        <p className="text-muted-foreground mb-8">
          O aplicativo para entregadores do ecossistema Rangooo. Receba pedidos,
          navegue até o cliente e acompanhe suas entregas de forma simples e
          rápida.
        </p>

        <Link href="/login">
          <Button className="w-full" size="lg">
            Começar agora
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
