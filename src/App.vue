<template>
  <v-app v-if="$root.loaded">
    <app-bar
      :items="items"
      :user="user"
      :logged="loggedIn"
      :can="can"
      v-if="isMobile"
    ></app-bar>
    <nav-bar
      :items="items"
      :user="user"
      :logged="loggedIn"
      :can="can"
      v-else
    ></nav-bar>

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
        <strong>OMG</strong> -
        <router-link
          class="text-decoration-underline"
          to="/terms-of-service"
          v-text="'Terms of service'"
        />
        |
        <router-link
          class="text-decoration-underline"
          to="/privacy-policy"
          v-text="'Privacy Policy'"
        />
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
    drawer: false,
    items,
  }),

  components,

  methods: {
    translateNumber,

    can(visible) {
      return visible ? visible.includes(this.user && this.user.role) : true;
    },
  },

  beforeMount() {
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
      const breakpoints = ["sm", "xs"];
      return breakpoints.includes(this.$vuetify.breakpoint.name);
    },

    user() {
      return this.$root.user;
    },

    loggedIn() {
      return this.$root.loggedIn;
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
