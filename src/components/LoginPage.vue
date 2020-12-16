<template>
  <v-container>
    <v-btn
      class="mt-5"
      align="center"
      justify="space-around"
      color="error"
      @click="signInWithGoogle()"
      block
      large
    >
      <span class="mr-2"> <v-icon>mdi-google</v-icon> Log In with Google </span>
    </v-btn>
    <v-btn
      class="mt-5"
      align="center"
      justify="space-around"
      color="primary"
      @click="signInWithFacebook()"
      block
      large
    >
      <span class="mr-2">
        <v-icon>mdi-facebook</v-icon> Log In with Facebook
      </span>
    </v-btn>
  </v-container>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "LoginPage",
  methods: {
    signInWithGoogle() {
      var provider = new auth.GoogleAuthProvider();
      auth().signInWithRedirect(provider);
    },
    signInWithFacebook() {
      auth().signInWithRedirect(new auth.FacebookAuthProvider());
    },
  },
};
</script>

<style>
</style>
