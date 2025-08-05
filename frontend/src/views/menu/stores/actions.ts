import { MenuService } from "@/services/menuService";
import type { Getters } from "@views/menu/stores/getters";
import type { Mutations } from "@views/menu/stores/mutations";

export interface Actions {
  loadMenuItems(): Promise<void>;
}

const createActions = (mutations: Mutations, getters: Getters): Actions => {
  const loadMenuItems = async (): Promise<void> => {
    const items = await MenuService.getMenuItems();
    mutations.SET_MENU_ITEMS(items);
  };

  return {
    loadMenuItems,
  };
};

export default createActions;
