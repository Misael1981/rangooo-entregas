"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

const ButtonLogout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <Button variant="destructive" className="w-full" onClick={handleLogout}>
        <LogOutIcon />
        Sair
      </Button>
    </>
  );
};

export default ButtonLogout;
