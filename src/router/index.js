import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

Vue.use(VueRouter);

var homeRoute = {
  path: "/",
  name: "Home",
  icon: "mdi-home-circle",
  component: Home,
};

const routes = [homeRoute];

const sideMenuRoutes = [homeRoute];

const sideMenuRoutesLoggedOut = [homeRoute];

const router = new VueRouter({ routes });

router.routes = routes;
router.sideMenuRoutes = sideMenuRoutes;
router.sideMenuRoutesLoggedOut = sideMenuRoutesLoggedOut;

export default router;
