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
      <v-btn text @click="dialog != true">
        <v-avatar color="primary" size="30">
          <img v-if="$root.user.photoURL" :src="$root.user.photoURL" alt="profile" />
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-avatar>
        <span class="text-regular" v-html="$root.user.displayName || 'My Account'"></span>
      </v-btn>
      <!--  -->
      <v-btn v-if="$root.user" @click="signOut()" icon>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "NavBar",
  data: () => ({
    dialog: false,
  }),
  methods: {
    signOut() {
      auth().signOut();
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
</style>
