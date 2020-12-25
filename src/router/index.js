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
    component: Dashboard,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
