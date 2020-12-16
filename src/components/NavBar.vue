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
    <v-btn v-if="$root.user" @click="signOut()" text>
      <span class="mr-2">{{ $root.user.displayName }}</span>
      <v-icon>mdi-login-variant</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "NavBar",
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
</style>
