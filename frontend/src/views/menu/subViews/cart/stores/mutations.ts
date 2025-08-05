import type { State } from "@views/menu/subViews/cart/stores/state";
import type { MenuItem } from "@views/menu/models/MenuItem";

export interface Mutations {
  ADD_ITEM(item: MenuItem): void;
  REMOVE_ITEM(itemId: number): void;
  CLEAR_CART(): void;
  REMOVE_ITEM_BTY_MENU_ITEM_ID(menuItemId: number): void;
}

const createMutations = (state: State): Mutations => {
  const ADD_ITEM = (item: MenuItem): void => {
    const currentMaxId = state.addedMenuItems.length
      ? Math.max(...state.addedMenuItems.map(menu => menu.id))
      : 0;

    const newId = currentMaxId + 1;
    state.addedMenuItems.push({ id: newId, item });
  };

  const REMOVE_ITEM = (itemId: number): void => {
    state.addedMenuItems = state.addedMenuItems.filter((item) => item.id !== itemId);
  };

  const REMOVE_ITEM_BTY_MENU_ITEM_ID = (menuItemId: number): void => {
    const cartItemId = state.addedMenuItems.find(item => item.item.id === menuItemId)?.id;
    if (!cartItemId) return;
    state.addedMenuItems = state.addedMenuItems.filter(item => item.id !== cartItemId);
  }

  const CLEAR_CART = (): void => {
    state.addedMenuItems = [];
  };

  return {
    ADD_ITEM,
    REMOVE_ITEM,
    CLEAR_CART,
    REMOVE_ITEM_BTY_MENU_ITEM_ID,
  };
};

export default createMutations;
