import { defineStore } from "pinia";
import createState, { type State } from "@views/menu/stores/state";
import createMutations, { type Mutations } from "@views/menu/stores/mutations";
import createActions, { type Actions } from "@views/menu/stores/actions";
import createGetters, { type Getters } from "@views/menu/stores/getters";

export const useMenuStore = defineStore("menuStore", () => {
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
