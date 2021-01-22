<template>
  <v-app v-if="$root.loaded">
    <v-overlay :value="overlay" />

    <v-navigation-drawer v-model="drawer" fixed temporary v-if="$root.user">
      <template v-slot:prepend>
        <router-link to="/profile" class="text-decoration-none">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img v-if="$root.user.photoURL" :src="$root.user.photoURL" />
              <v-icon v-else large>mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ displayName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-btn text small color="red" dark :to="{ path: '/logout' }">
                  အကောင့်မှထွက်ရန်
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <template v-for="(item, index) in items">
            <v-list-item :to="item.path" :key="index" v-if="can(item.visible)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark v-if="$root.user">
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>
        <router-link :to="{ path: '/' }">
          <v-img
            id="logo"
            alt="OMG"
            class="shrink mr-2"
            contain
            :src="logo"
            :lazy-src="logo"
            transition="scale-transition"
            width="80"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <!-- contents -->
    <v-main>
      <v-container>
        <router-view />
        <!-- <access-denied /> -->
      </v-container>
    </v-main>

    <!-- fab floating button -->
    <v-speed-dial
      v-if="$root.user"
      fixed
      v-model="fab"
      bottom
      right
      direction="top"
      transition="scale-transition"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" dark fab color="secondary">
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <!-- create product -->
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="secondary"
            v-bind="attrs"
            v-on="on"
            to="/products/new"
          >
            <v-icon>mdi-book-plus-multiple</v-icon>
          </v-btn>
        </template>
        <span>ကုန်ပစ္စည်းအသစ်ထည့်သွင်း</span>
      </v-tooltip>

      <!-- create category -->
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            dark
            small
            color="secondary"
            v-bind="attrs"
            v-on="on"
            to="/categories?new"
          >
            <v-icon>mdi-book-plus-multiple</v-icon>
          </v-btn>
        </template>
        <span>ပစ္စည်းအမျိုးအစားထည့်သွင်း</span>
      </v-tooltip>
    </v-speed-dial>

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
import AccessDenied from "./components/AccessDenied.vue";
import { translateNumber } from "./app/burmese";
import logo from "./assets/img/logo.png";

export default {
  name: "App",

  data: () => ({
    logo,
    overlay: false,
    drawer: false,
    group: null,
    fab: false,
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
    ],
  }),

  components: {
    AccessDenied,
  },

  methods: {
    translateNumber,

    can(visible) {
      let user = this.$root.user;
      return visible ? visible.includes(user && user.role) : true;
    },
  },

  created() {
    this.$root.overlay = (value) => {
      this.overlay = value;
    };
  },

  computed: {
    displayName() {
      const user = this.$root.user;
      return user.displayName || user.email || user.phoneNumber;
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
