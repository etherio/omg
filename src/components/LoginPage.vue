<template>
  <v-container>
    <v-form ref="form">
      <h2 class="mb-4">Log In with Email</h2>
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        :rules="rules.email"
        outlined
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        :rules="rules.password"
        outlined
      />
      <v-btn
        class="my-4"
        align="center"
        justify="space-around"
        color="primary"
        large
        block
        outlined
        @click="signInWithEmailAndPassword()"
      >
        Log In
      </v-btn>
      <v-alert v-if="error" dense outlined type="error">{{ error }}</v-alert>
    </v-form>

    <v-divider class="my-10" />

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
      <span class="mr-2"> <v-icon>mdi-facebook</v-icon> Log In with Facebook </span>
    </v-btn>
  </v-container>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "LoginPage",
  data: () => ({
    error: null,
    email: null,
    password: null,
    rules: {
      email: [
        (value) =>
          !!(value || "").match(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          ) || "Enter a vaild email address",
      ],
      password: [(value) => !!value || "Password is required"],
    },
  }),
  methods: {
    signInWithEmailAndPassword() {
      this.errors = [];

      if (!this.$refs.form.validate()) {
        return;
      }

      auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .catch((err) => {
          console.error(err);
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "User does not exist";
              break;
            default:
              this.error = err.message || err.toString();
          }
        });
    },
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

<style></style>
