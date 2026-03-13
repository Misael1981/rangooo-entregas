import { AreaType, VehicleType } from "@/generated/prisma/enums";

export const VEHICLES_LABEL: Record<
  (typeof VehicleType)[keyof typeof VehicleType],
  string
> = {
  [VehicleType.BIKE]: "Bicicleta",
  [VehicleType.CAR]: "Carro",
  [VehicleType.MOTORCYCLE]: "Moto",
};

export const areaTypes_label: Record<
  (typeof AreaType)[keyof typeof AreaType],
  string
> = {
  [AreaType.DISTRICT]: "Zona Distrital",
  [AreaType.URBAN]: "Área Urbana",
  [AreaType.RURAL]: "Zona Rural",
};
