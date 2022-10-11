import { createApp } from "vue";
import App from "./App.vue";

import autoRoutes from "virtual:generated-pages";
import {
  createRouter,
  createWebHistory,
  RouterScrollBehavior,
} from "vue-router";
import gsap from "gsap";

import "virtual:windi.css";
import "virtual:windi-devtools";
import "~/assets/styles/_index.scss";

const app = createApp(App);

// Router
const routes = autoRoutes.map((route) => {
  return {
    ...route,
    alias: route.path.endsWith("/") ? `${route.path}index` : route.path,
  };
});

const scrollBehavior: RouterScrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    return { el: to.hash };
  }
  return { top: 0, behavior: "smooth" };
};

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior,
});

app.use(router);

app.provide("gsap", gsap);
app.mount("#app");
