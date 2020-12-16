<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, index) in items"
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

    <v-main v-if="$root.loaded">
      <!-- if User is LOGGED IN -->
      <v-container v-if="$root.user">
        <!-- if Access Permission is NOT DENIED -->
        <access-denied v-if="$root.denied" />
        <!-- if Access Permission is DENIED -->
        <router-view v-else></router-view>
      </v-container>
      <!-- if User is NOT LOGGED IN -->
      <login-page v-else />
    </v-main>
    <v-container v-else>
      <div id="preload">
        <v-progress-circular size="70" indeterminate color="primary" />
      </div>
    </v-container>
  </v-app>
</template>

<script>
import AccessDenied from "./components/AccessDenied.vue";
import NavBar from "./components/NavBar.vue";
import LoginPage from "./components/LoginPage.vue";

export default {
  name: "App",

  components: {
    NavBar,
    LoginPage,
    AccessDenied,
  },

  data: () => ({
    drawer: false,
    group: null,
    items: [
      { icon: "mdi-home", title: "Home", path: "/" },
      { icon: "mdi-cart", title: "Products", path: "/products" },
    ],
  }),
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
