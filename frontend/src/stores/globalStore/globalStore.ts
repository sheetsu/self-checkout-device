import { defineStore } from "pinia";
import createState, { type State } from "@/stores/globalStore/state";
import createMutations, { type Mutations } from "@/stores/globalStore/mutations";
import createActions, { type Actions } from "@/stores/globalStore/actions";
import createGetters, { type Getters } from "@/stores/globalStore/getters";

export const useGlobalStore = defineStore("globalStore", () => {
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
