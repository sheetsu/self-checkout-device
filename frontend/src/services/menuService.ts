import api from "@/api/client";
import type { GetMenuItemsResponse } from "@/api/types/api.response";

export class MenuService {
  static async getMenuItems(): Promise<GetMenuItemsResponse> {
    return await api.get<GetMenuItemsResponse>('self_checkout_devices/menu_items', 'v2');
  }
}
