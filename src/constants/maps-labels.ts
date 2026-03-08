import { VehicleType } from "@/generated/prisma/enums";

export const VEHICLES_LABEL: Record<
  (typeof VehicleType)[keyof typeof VehicleType],
  string
> = {
  [VehicleType.BIKE]: "Bicicleta",
  [VehicleType.CAR]: "Carro",
  [VehicleType.MOTORCYCLE]: "Moto",
};
