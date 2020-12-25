<template>
  <v-app>
    <v-overlay :value="overlay" />

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
            v-if="item.visibility ? item.visibility.includes($root.role) : true"
            :key="index"
            :to="item.path"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <nav-bar>
        <v-app-bar-nav-icon @click="drawer = true" />
      </nav-bar>
    </v-app-bar>

    <!-- contents -->
    <v-main v-if="$root.loaded">
      <v-container v-if="$root.user">
        <access-denied v-if="$root.denied" />
        <router-view v-else></router-view>
      </v-container>
      <login-page v-else />
    </v-main>
    <v-container v-else>
      <div id="preload">
        <v-progress-circular size="70" indeterminate color="primary" />
      </div>
    </v-container>
    <!-- footer -->
    <v-footer padless>
      <v-col class="text-center" cols="12">
        &copy; {{ new Date().getFullYear() }} <strong>OMG</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AccessDenied from "./components/AccessDenied.vue";
import NavBar from "./components/NavBar.vue";
import LoginPage from "./components/LoginPage.vue";

export default {
  name: "App",

  data: () => ({
    overlay: false,
    drawer: false,
    group: null,
    items: [
      {
        icon: "mdi-apps",
        title: "Dashboard",
        path: "/",
      },
      {
        icon: "mdi-account-multiple",
        title: "Customers",
        path: "/customers",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-store",
        title: "Products",
        path: "/products",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-tag",
        title: "Category",
        path: "/Categories",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-dolly",
        title: "Inventory",
        path: "/search",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-truck",
        title: "Orders",
        path: "/orders",
        visibility: ["admin", "moderator"],
      },
      {
        icon: " mdi-cash-multiple",
        title: "Transactions",
        path: "/transactions",
        visibility: ["admin", "moderator"],
      },
      {
        icon: " mdi-folder-outline",
        title: "Storage",
        path: "/storage",
        visibility: ["admin"],
      },
      {
        icon: "mdi-security",
        title: "User Permssions",
        path: "/users",
        visibility: ["admin"],
      },
      {
        icon: " mdi-receipt",
        title: "Logs",
        path: "/logs",
        visibility: ["admin"],
      },
    ],
  }),

  components: {
    NavBar,
    LoginPage,
    AccessDenied,
  },

  beforeMount() {
    this.$root.overlay = (value) => {
      this.overlay = value;
    };
  },
};
</script>

<style scoped>
#preload {
  display: flex;
  width: 100%;
  height: calc(100vh - 5rem);
  justify-content: center;
  align-items: center;
}
</style>
