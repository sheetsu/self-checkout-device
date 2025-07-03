import type { State } from "@/stores/globalStore/state";

export interface Mutations {
  SET_LANGUAGE(lang: string): void;
}

const createMutations = (state: State): Mutations => {
  const SET_LANGUAGE = (lang: string): void => {
    state.lang = lang;
  };

  return {
    SET_LANGUAGE
  };
};

export default createMutations;
