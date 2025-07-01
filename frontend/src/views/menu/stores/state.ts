import { reactive } from "vue";

export interface State {

}

const createState = () => {
  return reactive<State>({

  });
};

export default createState;
