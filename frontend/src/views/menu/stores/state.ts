import { reactive } from "vue";
import type { MenuItem } from "@/models/MenuItem";

export interface State {
  menuItems: MenuItem[];
}

const createState = () => {
  return reactive<State>({
    menuItems: [],
  });
};

export default createState;
