import {
  AreaType,
  ConsumptionMethod,
  OrderStatus,
} from "@/generated/prisma/enums";

export interface DeliveryAddressDTO {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  complement?: string | null;
  reference?: string | null;
  areaType: AreaType;
}

export interface ItemsDTO {
  customName: string | null;
  quantity: number;
  priceAtOrder: number;
}

export interface RestaurantDTO {
  name: string;
  street: string | null;
  number: string | null;
  neighborhood: string | null;
  avatarImageUrl: string | null;
}

export interface UserDTO {
  name: string;
  phone?: string | null;
}

export interface OrderDTO {
  id: string;
  orderNumber: number | null;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  deliveryAddress: DeliveryAddressDTO;
  paymentMethod: string | null;
  consumptionMethod: ConsumptionMethod;
  deliveryPersonId: string | null;
  restaurant: RestaurantDTO;
  user: UserDTO;
  items?: ItemsDTO[];
}
