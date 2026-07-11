export const OrderStatus = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  PREPARING: "PREPARING",
  OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY",
  READY_FOR_PICKUP: "READY_FOR_PICKUP",
  DELIVERED: "DELIVERED",
  CANCELED: "CANCELED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const AreaType = {
  URBAN: "URBAN",
  RURAL: "RURAL",
  DISTRICT: "DISTRICT",
} as const;

export type AreaType = (typeof AreaType)[keyof typeof AreaType];

export const ConsumptionMethod = {
  DELIVERY: "DELIVERY",
  PICKUP: "PICKUP",
  DINE_IN: "DINE_IN",
} as const;

export type ConsumptionMethod =
  (typeof ConsumptionMethod)[keyof typeof ConsumptionMethod];

export const VehicleType = {
  BIKE: "BIKE",
  MOTORCYCLE: "MOTORCYCLE",
  CAR: "CAR",
};

export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];
