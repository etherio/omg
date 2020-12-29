import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";
import Search from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import Products from "@/views/Products.vue";
import Categories from "@/views/Categories.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../components/ProductSearch.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/Users.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/Products.vue"),
  },
  {
    path: "/product/new",
    name: "Create new product",
    component: () => import("../components/ProductCreate.vue"),
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/Categories.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
