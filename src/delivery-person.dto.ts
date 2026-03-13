import {
  AreaType,
  ConsumptionMethod,
  OrderStatus,
} from "./generated/prisma/enums";

export interface DeliveryAddressDTO {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  complement?: string | null;
  areaType: AreaType;
}

export interface RestaurantDTO {
  number: string | null;
  name: string;
  avatarImageUrl: string | null;
  neighborhood: string | null;
  street: string | null;
}

export interface UserDTO {
  name: string;
}

export interface OrderDTO {
  totalAmount: number;
  deliveryFee: number;
  createdAt: string;
  id: string;
  userId: string;
  updatedAt: Date;
  restaurantId: string;
  customName: string | null;
  extras: string | null;
  orderNumber: number | null;
  printId: string | null;
  paymentMethod: string | null;
  status: OrderStatus;
  consumptionMethod: ConsumptionMethod;
  deliveryAddress: DeliveryAddressDTO;
  restaurant: RestaurantDTO;
  user: UserDTO;
}
