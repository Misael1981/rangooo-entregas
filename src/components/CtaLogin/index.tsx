import Link from "next/link";
import { Button } from "../ui/button";

const CtaLogin = () => {
  return (
    <section className="border-t">
      <div className="max-w-105 mx-auto p-6">
        <Link href="/login">
          <Button size="lg" className="w-full">
            Entrar no app
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CtaLogin;
