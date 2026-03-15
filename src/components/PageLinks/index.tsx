"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";

const linksPage = [
  {
    id: 1,
    url: "/entregador/dashboard",
    title: "Pedidos",
  },
  {
    id: 2,
    url: "/entregador/dashboard/delivery",
    title: "Entrega em Andamento",
  },
  {
    id: 3,
    url: "/entregador/dashboard/summary",
    title: "Painel de Atividade",
  },
];

const PageLinks = () => {
  const pathname = usePathname();

  return (
    <div className="border-y">
      <ScrollArea className="w-full">
        <div className="flex gap-2 p-2">
          {linksPage.map((link) => {
            const isActive = pathname === link.url;

            return (
              <Link key={link.id} href={link.url}>
                <Button variant={isActive ? "default" : "outline"}>
                  {link.title}
                </Button>
              </Link>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default PageLinks;
