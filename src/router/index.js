import Vue from "vue";
import VueRouter from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/dashboard/index.vue"),
  },
  {
    path: "/logout",
    component: () => import("@/views/logout.vue"),
  },
  {
    path: "/users",
    component: () => import("@/views/users/index.vue"),
  },
  {
    path: "/profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/products",
    component: () => import("@/views/products/index.vue"),
  },
  {
    path: "/products/new",
    component: () => import("@/views/products/create.vue"),
  },
  {
    path: "/products/new/:id",
    component: () => import("@/views/products/create.vue"),
  },
  {
    path: "/products/edit/:id",
    component: () => import("@/views/products/edit.vue"),
  },
  {
    path: "/products/:id",
    component: () => import("@/views/products/_id.vue"),
  },
  {
    path: "/colors",
    component: () => import("@/views/colors/index.vue"),
  },
  {
    path: "/facebook",
    component: () => import("@/views/products/facebook.vue"),
  },
  {
    path: "/reviews",
    component: () => import("@/views/reviews/index.vue"),
  },
  {
    path: "/categories",
    component: () => import("@/views/categories/index.vue"),
  },
  {
    path: "/reviews/:id",
    component: () => import("@/views/reviews/create.vue"),
  },
  {
    path: "/products/:id/:name",
    component: () => import("@/views/products/index.vue"),
  },
  {
    path: "/about/server",
    component: () => import("@/views/about/server.vue"),
  },
  {
    path: "/terms-of-service",
    component: () => import("@/views/about/terms-of-service.vue"),
  },
  {
    path: "/privacy-policy",
    component: () => import("@/views/about/privacy-policy.vue"),
  },
];

export default new VueRouter({
  scrollBehavior(from, to, pos) {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (pos) {
      scrollTo = pos;
    }
    return goTo(scrollTo);
  },
  mode: "history",
  routes,
});
