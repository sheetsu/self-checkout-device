import api from "@/api/client";
import type { Getters } from "@/stores/globalStore/getters";
import type { Mutations } from "@/stores/globalStore/mutations";

export interface Actions {
  changeLanguage(lang: string): void;
}

const createActions = (mutations: Mutations, getters: Getters): Actions => {
  const changeLanguage = (lang: string): void => {
    mutations.SET_LANGUAGE(lang);
  };

  return {
    changeLanguage
  };
};

export default createActions;
