<template>
  <v-row align="center" justify="space-around">
    <slot></slot>

    <v-toolbar-title>
      <v-img
        alt="OMG"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <!-- user logged in -->
    <div v-if="$root.user">
      <v-btn text @click="showAccount = !showAccount">
        <v-avatar color="primary" size="30">
          <img v-if="$root.user.photoURL" :src="$root.user.photoURL" alt="profile" />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        <span class="text-regular" v-html="$root.user.displayName || 'My Account'"></span>
      </v-btn>

      <!-- dropdrop for account -->
      <div v-if="showAccount" class="account">
        <v-card elevation="12">
          <v-navigation-drawer floating permanent>
            <v-list dense rounded>
              <!-- go to profile -->
              <v-list-item @click="viewProfile()">
                <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <!-- sign out action -->
              <v-list-item @click="signOut()">
                <v-list-item-icon><v-icon>mdi-login-variant</v-icon></v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Log Out</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </div>
    </div>
  </v-row>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "NavBar",
  data: () => ({
    showAccount: false,
  }),
  methods: {
    viewProfile() {
      this.showAccount = false;
      if (this.$route.path === "/profile") {
        return;
      }
      this.$router.replace("/profile");
    },
    signOut() {
      this.showAccount = false;
      auth()
        .signOut()
        .then(() => this.$router.replace("/"));
    },
  },
  watch: {
    showAccount(value) {
      this.$root.overlay(value);
    },
  },
};
</script>

<style scoped>
.d-flex.align-center {
  width: 100%;
}

.text-regular {
  text-transform: none;
  letter-spacing: normal;
  padding-left: 5px;
}

.account {
  position: absolute;
  top: 65px;
  right: 10px;
}
</style>
