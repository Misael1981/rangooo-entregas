import { AreaType, ConsumptionMethod, OrderStatus, VehicleType } from "./enums";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  PENDING: "Pendente",
  CONFIRMED: "Confirmado",
  PREPARING: "Preparando",
  OUT_FOR_DELIVERY: "Saiu para entrega",
  READY_FOR_PICKUP: "Pronto para retirar",
  DELIVERED: "Entregue",
  CANCELED: "Cancelado",
};

export const AREA_TYPE_LABELS: Record<AreaType, string> = {
  URBAN: "Área Urbana",
  RURAL: "Área Rural",
  DISTRICT: "Distrito",
};

export const CONSUMPTION_METHOD_LABELS: Record<ConsumptionMethod, string> = {
  DELIVERY: "Entrega",
  PICKUP: "Retirada",
  DINE_IN: "Consumir no Local",
};

export const VEHICLE_TYPE_LABELS: Record<VehicleType, string> = {
  BIKE: "Bicicleta",
  MOTORCYCLE: "Moto",
  CAR: "Carro",
};
