export interface OrderItemType {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface ShippingAddressType {
  name: string;
  phone: string;
  address: string;
}

export interface PaymentMethodType {
  id: string;
  label: string;
  icon: string;
  desc: string;
}
