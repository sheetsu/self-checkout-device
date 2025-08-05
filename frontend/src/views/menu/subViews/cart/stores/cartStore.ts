import { defineStore } from "pinia";
import createState, { type State } from "@views/menu/subViews/cart/stores/state";
import createMutations, { type Mutations } from "@views/menu/subViews/cart/stores/mutations";
import createActions, { type Actions } from "@views/menu/subViews/cart/stores/actions";
import createGetters, { type Getters } from "@views/menu/subViews/cart/stores/getters";

export const useCartStore = defineStore("cartStore", () => {
  const state: State = createState();
  const getters: Getters = createGetters(state);
  const mutations: Mutations = createMutations(state);
  const actions: Actions = createActions(mutations, getters);

  return {
    state,
    getters,
    actions,
  };
});
