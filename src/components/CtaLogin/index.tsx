"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import DialogLogin from "../DialogLogin";

const CtaLogin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <section className="border-t">
      <div className="max-w-105 mx-auto p-6">
        <Button size="lg" className="w-full" onClick={handleOpenDialog}>
          Fazer Login
        </Button>
      </div>
      <DialogLogin isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};

export default CtaLogin;
