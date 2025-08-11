import type { State } from "@views/menu/subViews/cart/stores/state";
import { computed, ComputedRef } from "vue";

export interface Getters {
  itemsCount: ComputedRef<number>;
  cartTotalPrice: ComputedRef<number>;
  orderItems: ComputedRef<{ menuItemId: string, quantity: number }[]>;
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

  const orderItems = computed<{ menuItemId: string, quantity: number }[]>(() => {
    const counts = new Map<number, number>();
    for (const entry of state.addedMenuItems) {
      const id = entry.item.id;
      counts.set(id, (counts.get(id) ?? 0) + 1);
    }

    return Array.from(counts, ([menuItemId, quantity]) => ({ menuItemId: menuItemId.toString(), quantity }));
  });

  return {
    itemsCount,
    cartTotalPrice,
    orderItems,
  };
};

export default createGetters;
