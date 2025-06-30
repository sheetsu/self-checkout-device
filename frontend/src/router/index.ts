import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MenuView from "@views/menu/MenuView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "menu",
    component: MenuView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
