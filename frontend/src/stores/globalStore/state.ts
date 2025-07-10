import { reactive } from "vue";

export interface State {
  lang: string;
}

const createState = () => {
  return reactive<State>({
    lang: "pl",
  });
};

export default createState;
