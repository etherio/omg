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
        &copy; {{ translateNumber(new Date().getFullYear()) }}
        <strong>OMG</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AccessDenied from "./components/AccessDenied.vue";
import NavBar from "./components/NavBar.vue";
import LoginPage from "./components/LoginPage.vue";
import { translateNumber } from "./app/burmese";

export default {
  name: "App",

  data: () => ({
    overlay: false,
    drawer: false,
    group: null,
    items: [
      {
        icon: "mdi-apps",
        title: "မူလစာမျက်နှာ",
        path: "/",
      },
      {
        icon: "mdi-account-multiple",
        title: "အဆက်အသွယ်များ",
        path: "/customers",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-store",
        title: "ကုန်ပစ္စည်းများ",
        path: "/products",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-truck",
        title: "အော်ဒါများ",
        path: "/orders",
        visibility: ["admin", "moderator"],
      },
      {
        icon: "mdi-security",
        title: "ခွင့်ပြုချက်များ",
        path: "/users",
        visibility: ["admin"],
      },
      {
        icon: " mdi-receipt",
        title: "မှတ်တမ်းများ",
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

  methods: {
    translateNumber,
  },

  created() {
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
