import { AreaType, ConsumptionMethod, OrderStatus, VehicleType } from "./enums";
import {
  AREA_TYPE_LABELS,
  CONSUMPTION_METHOD_LABELS,
  ORDER_STATUS_LABELS,
  VEHICLE_TYPE_LABELS,
} from "./labels";

export const ORDER_STATUS_OPTIONS = [
  {
    value: OrderStatus.PENDING,
    label: ORDER_STATUS_LABELS[OrderStatus.PENDING],
  },
  {
    value: OrderStatus.CONFIRMED,
    label: ORDER_STATUS_LABELS[OrderStatus.CONFIRMED],
  },
  {
    value: OrderStatus.PREPARING,
    label: ORDER_STATUS_LABELS[OrderStatus.PREPARING],
  },

  {
    value: OrderStatus.OUT_FOR_DELIVERY,
    label: ORDER_STATUS_LABELS[OrderStatus.OUT_FOR_DELIVERY],
  },
  {
    value: OrderStatus.READY_FOR_PICKUP,
    label: ORDER_STATUS_LABELS[OrderStatus.READY_FOR_PICKUP],
  },
  {
    value: OrderStatus.DELIVERED,
    label: ORDER_STATUS_LABELS[OrderStatus.DELIVERED],
  },
  {
    value: OrderStatus.CANCELED,
    label: ORDER_STATUS_LABELS[OrderStatus.CANCELED],
  },
] as const;

export const AREA_TYPE_OPTIONS = [
  {
    value: AreaType.URBAN,
    label: AREA_TYPE_LABELS[AreaType.URBAN],
  },
  {
    value: AreaType.RURAL,
    label: AREA_TYPE_LABELS[AreaType.RURAL],
  },
  {
    value: AreaType.DISTRICT,
    label: AREA_TYPE_LABELS[AreaType.DISTRICT],
  },
];

export const CONSUMPTION_METHOD_OPTIONS = [
  {
    value: ConsumptionMethod.DELIVERY,
    label: CONSUMPTION_METHOD_LABELS[ConsumptionMethod.DELIVERY],
  },
  {
    value: ConsumptionMethod.PICKUP,
    label: CONSUMPTION_METHOD_LABELS[ConsumptionMethod.PICKUP],
  },
  {
    value: ConsumptionMethod.DINE_IN,
    label: CONSUMPTION_METHOD_LABELS[ConsumptionMethod.DINE_IN],
  },
];

export const VEHICLE_TYPE_OPTIONS = [
  {
    value: VehicleType.BIKE,
    label: VEHICLE_TYPE_LABELS[VehicleType.BIKE],
  },
  {
    value: VehicleType.CAR,
    label: VEHICLE_TYPE_LABELS[VehicleType.CAR],
  },
  {
    value: VehicleType.MOTORCYCLE,
    label: VEHICLE_TYPE_LABELS[VehicleType.MOTORCYCLE],
  },
];

// <span>{ORDER_STATUS_LABELS[order.status]}</span>
