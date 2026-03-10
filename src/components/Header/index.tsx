"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import SheetMenu from "./components/SheetMenu";

const Header = () => {
  const [openSheetMenu, setOpenSheetMenu] = useState(false);

  const handleOpenSheetMenu = () => {
    setOpenSheetMenu(true);
  };

  return (
    <header className="w-full border-b">
      <div className="max-w-105 mx-auto flex items-center justify-between p-4">
        <h1 className="text-lg font-bold text-primary">Rangooo Entregas 🛵</h1>

        <Button
          variant="ghost"
          className="text-primary p-0"
          onClick={handleOpenSheetMenu}
        >
          <EllipsisVertical />
        </Button>
      </div>
      <SheetMenu
        open={openSheetMenu}
        onOpenChange={() => setOpenSheetMenu(false)}
      />
    </header>
  );
};

export default Header;
