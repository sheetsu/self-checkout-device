import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "menu",
    component: () => import(/* webpackChunkName: "menu" */ "@views/menu/MenuView.vue"),
  },
  {
    path: "/playground",
    name: "playground",
    component: () => import(/* webpackChunkName: "playground" */ "@views/playground/PlaygroundView.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
