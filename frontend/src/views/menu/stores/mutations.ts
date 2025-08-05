import type { State } from "@views/menu/stores/state";
import type { MenuItem } from "@/models/MenuItem";

export interface Mutations {
  SET_MENU_ITEMS(data: MenuItem[]): void;
}

const createMutations = (state: State): Mutations => {
  const SET_MENU_ITEMS = (data: MenuItem[]) => {
    state.menuItems = data;
  }

  return {
    SET_MENU_ITEMS,
  };
};

export default createMutations;
