import ButtonLogin from "@/components/ButtonLogin";
import ButtonLogout from "@/components/ButtonLogout";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSession } from "next-auth/react";
import Link from "next/link";

const linksPage = [
  {
    id: 1,
    title: "Política de Privacidade",
    href: "/privacidade",
  },
  {
    id: 2,
    title: "Termos de Uso",
    href: "/termos",
  },
];

type SheetMenuProps = {
  open: boolean;
  onOpenChange: () => void;
};

const SheetMenu = ({ open, onOpenChange }: SheetMenuProps) => {
  const { data } = useSession();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <div className="min-h-full flex flex-col gap-6 justify-between">
          <SheetHeader>
            <SheetTitle>Rangooo Entregas</SheetTitle>
            <SheetDescription>
              Seja bem vindo ao sistema de entregas Rangooo! Faça parte do nosso
              time!
            </SheetDescription>
          </SheetHeader>
          <div className=" flex-1 flex flex-col justify-end gap-6 px-4">
            <ul className="flex flex-col gap-4 text-primary pb-10">
              {linksPage.map((link) => (
                <li
                  key={link.id}
                  className="border-b border-primary-foreground pb-2"
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <SheetFooter className="flex-col gap-2">
            {data?.user ? <ButtonLogout /> : <ButtonLogin />}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetMenu;
