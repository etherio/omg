<template>
  <v-app v-if="$root.loaded">
    <nav-bar :items="items" :user="user" :can="can" v-if="isMobile"></nav-bar>
    <app-bar :items="items" :user="user" :can="can" v-else></app-bar>

    <!-- contents -->
    <v-main>
      <v-container v-if="loggedIn">
        <v-expand-transition>
          <access-denied v-show="!authorize"></access-denied>
        </v-expand-transition>
        <router-view></router-view>
      </v-container>
      <v-container v-else>
        <login-page></login-page>
      </v-container>
    </v-main>

    <!-- fab floating button -->
    <fab-button></fab-button>

    <!-- footer -->
    <v-footer padless>
      <v-col class="text-center" cols="12">
        &copy; {{ translateNumber(new Date().getFullYear()) }}
        <strong>OMG</strong>
      </v-col>
    </v-footer>
  </v-app>

  <!-- loading -->
  <v-container v-else>
    <div id="preload">
      <v-progress-circular size="70" indeterminate color="primary" />
    </div>
  </v-container>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import AppBar from "./components/AppBar.vue";
import AccessDenied from "./components/AccessDenied.vue";
import FabButton from "./components/FabButton.vue";
import LoginPage from "./views/login.vue";
import items from "./nav-menu";
import { translateNumber } from "./app/burmese";

const components = {
  NavBar,
  AppBar,
  AccessDenied,
  FabButton,
  LoginPage,
};

export default {
  name: "App",

  data: () => ({
    user: null,
    drawer: false,
    items,
  }),

  components,

  methods: {
    translateNumber,

    can(visible) {
      let user = this.$root.user;
      return visible ? visible.includes(user && user.role) : true;
    },
  },

  beforeMount() {
    this.user = this.$store.state.user || this.$root.user;
    this.$root.fab = true;
  },

  computed: {
    displayName() {
      const user = this.$root.user || {};
      return user.displayName || user.email || user.phoneNumber;
    },

    authorize() {
      const roles = ["admin", "moderator"];
      const user = this.$root.user || {};
      return user.role && roles.includes(user.role);
    },

    isMobile() {
      return this.$vuetify.breakpoint.sm;
    },

    loggedIn() {
      return Boolean(this.user);
    },
  },
};
</script>

<style>
#preload {
  display: flex;
  width: 100%;
  height: calc(100vh - 5rem);
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
}
</style>
