import type { State } from "@views/menu/subViews/cart/stores/state";
import { computed, ComputedRef } from "vue";

export interface Getters {
  itemsCount: ComputedRef<number>;
  cartTotalPrice: ComputedRef<number>;
}

const createGetters = (state: State): Getters => {
  const itemsCount = computed<number>(() => {
    return state.addedMenuItems.length;
  });

  const cartTotalPrice = computed<number>(() => {
    return state.addedMenuItems.reduce((total, item) => {
      return total + item.item.totalPriceCents;
    }, 0);
  });

  return {
    itemsCount,
    cartTotalPrice,
  };
};

export default createGetters;
