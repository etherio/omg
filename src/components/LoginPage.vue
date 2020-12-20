<template>
  <v-container justify="center">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-form ref="form" v-model="valid" lazy-validation>
      <h2 class="mb-4">Log In with Email</h2>
      <v-text-field
        v-model="email"
        label="Email"
        type="email"
        :rules="rules.email"
        @keyup.enter="signInWithEmailAndPassword()"
        outlined
      />
      <v-text-field
        v-model="password"
        label="Password"
        autocapitalize="off"
        :append-icon="showPassword ? '' : ''"
        :type="showPassword ? 'text' : 'password'"
        :rules="rules.password"
        @keyup.enter="signInWithEmailAndPassword()"
        outlined
      />
      <v-btn
        class="my-4"
        align="center"
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

    <v-btn class="mt-5" color="error" @click="signInWithGoogle()" block large>
      <span class="mr-2"> <v-icon>mdi-google</v-icon> Log In with Google </span>
    </v-btn>
    <v-btn class="mt-5" color="primary" @click="signInWithFacebook()" block large>
      <span class="mr-2"> <v-icon>mdi-facebook</v-icon> Log In with Facebook </span>
    </v-btn>
  </v-container>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "LoginPage",
  data: () => ({
    loading: false,
    error: null,
    valid: null,
    email: null,
    password: null,
    showPassword: false,
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
      if (!this.$refs.form.validate()) {
        return;
      }
      this.loading = true;
      this.error = null;

      auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => (this.loading = true))
        .catch((err) => {
          this.loading = false;

          switch (err.code) {
            case "auth/user-not-found":
              this.error = "Email does not exist";
              break;
            case "auth/wrong-password":
              this.error = "Incorrect password";
              break;
            default:
              this.error = err.message || err.toString();
          }
        });
    },
    signInWithGoogle() {
      const provider = new auth.GoogleAuthProvider();
      this.loading = true;
      this.error = null;
      auth()
        .signInWithRedirect(provider)
        .then(() => (this.loading = false));
    },
    signInWithFacebook() {
      const provider = new auth.FacebookAuthProvider();
      this.loading = true;
      this.error = null;
      auth()
        .signInWithRedirect(provider)
        .then(() => (this.loading = false));
    },
  },
  beforeMount() {
    this.$root.overlay(false);
  },
};
</script>

<style></style>
