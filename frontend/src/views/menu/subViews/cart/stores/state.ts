import { reactive } from "vue";
import type { CartItem } from "@views/menu/subViews/cart/models/CartItem";

export interface State {
  addedMenuItems: CartItem[];
}

const createState = () => {
  return reactive<State>({
    addedMenuItems: [],
  });
};

export default createState;
