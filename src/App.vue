<template>
  <v-app v-if="$root.loaded">
    <nav-bar :items="items"></nav-bar>

    <!-- contents -->
    <v-main class="ms-15">
      <v-container>
        <router-view></router-view>
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
import FabButton from "./components/FabButton.vue";
import { translateNumber } from "./app/burmese";

const components = {
  NavBar,
  FabButton,
};

const items = [
  {
    icon: "mdi-apps",
    title: "မူလစာမျက်နှာ",
    path: "/",
  },
  {
    icon: "mdi-account-multiple",
    title: "အဆက်အသွယ်များ",
    path: "/customers",
    visible: [],
  },
  {
    icon: "mdi-store",
    title: "ကုန်ပစ္စည်းများ",
    path: "/products",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-truck",
    title: "အော်ဒါများ",
    path: "/orders",
    visible: [],
  },
  {
    icon: "mdi-cart",
    title: "အမျိုးအစားများ",
    path: "/categories",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-format-color-fill",
    title: "အရောင်များ",
    path: "/colors",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-compare",
    title: "အကဲဖြတ်ရန်​",
    path: "/reviews",
    visible: ["admin", "moderator"],
  },
  {
    icon: "mdi-account-multiple ",
    title: "အသုံးပြုသူများ",
    path: "/users",
    visible: ["admin"],
  },
  {
    icon: " mdi-receipt",
    title: "မှတ်တမ်းများ",
    path: "/logs",
    visible: [],
  },
  {
    icon: " mdi-monitor-eye",
    title: "Server Status",
    path: "/about/server",
  },
];

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
  },

  created() {
    this.user = this.$store.state.user;
    this.$root.fab = true;
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
