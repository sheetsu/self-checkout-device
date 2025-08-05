import type { Getters } from "@views/menu/subViews/cart/stores/getters";
import type { Mutations } from "@views/menu/subViews/cart/stores/mutations";
import type { MenuItem } from "@/views/menu/models/MenuItem";

export interface Actions {
  addItem(item: MenuItem): void;
  removeItem(itemId: number): void;
  clearCart(): void;
  removeItemByMenuItemId(menuItemId: number): void;
}

const createActions = (mutations: Mutations, getters: Getters): Actions => {
  const addItem = (item: MenuItem): void => {
    mutations.ADD_ITEM(item);
  };

  const removeItem = (itemId: number): void => {
    mutations.REMOVE_ITEM(itemId);
  };

  const clearCart = (): void => {
    mutations.CLEAR_CART();
  };

  const removeItemByMenuItemId = (menuItemId: number): void => {
    mutations.REMOVE_ITEM_BTY_MENU_ITEM_ID(menuItemId);
  };

  return {
    addItem,
    removeItem,
    clearCart,
    removeItemByMenuItemId,
  };
};

export default createActions;
