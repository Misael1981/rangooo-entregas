import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-105 mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-bold text-primary">Rangooo Entregas 🛵</h1>

        <Link href="/login">
          <Button size="sm">Entrar</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
