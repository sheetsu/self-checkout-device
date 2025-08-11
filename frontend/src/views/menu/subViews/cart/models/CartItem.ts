import type { MenuItem } from "@views/menu/models/MenuItem";

export type CartItem = {
  id: number;
  item: MenuItem;
};

export type OrderItem = {
  menuItemId: string;
  quantity: number;
}

export type Order = {
  employeeId: number;
  orderItems: OrderItem[];
}
