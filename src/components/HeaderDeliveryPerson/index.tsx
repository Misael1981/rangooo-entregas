"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import SheetDeliveryPerson from "../SheetDeliveryPerson";

type HeaderDeliveryPersonProps = {
  image: string | null | undefined;
  name: string | null | undefined;
  isOnline: boolean | undefined;
  deliveryPersonId: string | undefined;
};

const HeaderDeliveryPerson = ({
  image,
  name,
  isOnline,
  deliveryPersonId,
}: HeaderDeliveryPersonProps) => {
  const [openSheetDeliveryPerson, setOpenSheetDeliveryPerson] = useState(false);

  const handleOpenSheetDeliveryPerson = () => {
    setOpenSheetDeliveryPerson(true);
  };

  return (
    <header className="w-full flex justify-between items-center p-4">
      <div className="flex gap-2">
        <div className=" relative">
          <Avatar>
            <AvatarImage
              src={image || "https://github.com/shadcn.png"}
              alt={name || "Avatar"}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Badge
            className={`absolute z-50 bottom-0 right-0 h-4 w-4 rounded-full p-0 border border-white dark:border-gray-900 ${
              isOnline
                ? "bg-green-600 animate-pulse dark:bg-green-800"
                : "bg-red-600 dark:bg-red-800 animate-pulse"
            }`}
          />
        </div>
        <div>
          <p>
            Olá, <strong>{name}</strong>
          </p>
          {isOnline ? (
            <p className="text-xs text-card-foreground/60">Boas entregas!</p>
          ) : (
            <p className="text-xs text-card-foreground/60">
              Você está offline!
            </p>
          )}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenSheetDeliveryPerson}
      >
        <EllipsisVertical className="h-5 w-5" />
      </Button>
      <SheetDeliveryPerson
        open={openSheetDeliveryPerson}
        onOpenChange={setOpenSheetDeliveryPerson}
        isOnline={isOnline!}
        deliveryPersonId={deliveryPersonId!}
      />
    </header>
  );
};

export default HeaderDeliveryPerson;
