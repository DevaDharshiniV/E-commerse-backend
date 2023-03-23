export interface Order {
  id?: string;
  orderNumber: string;
  total: number;
  name: string;
  dateOrdered: Date | null;
  address: Address;
  status?: string;
  selectedOrderStatus: string;
}
export interface Address {
  name?: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}
export interface OrderWithStatus extends Order {
  status?: string;
}
