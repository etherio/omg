<template>
  <v-container class="mt-5 pa-2">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8">
        <v-card :loading="loading" class="px-2" elevation="4">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            @submit.prevent="signInWithEmailAndPassword"
          >
            <v-card-title class="pt-6 pb-5">
              <span class="text-center" style="width: 100%;">
                လက်မှတ်ထိုးဝင်ပါ
              </span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="email"
                label="သင့်အီးမေးလ်ထည့်ပါ"
                type="email"
                :rules="rules.email"
                @change="autocompleteEmail"
                outlined
              />
              <v-text-field
                v-model="password"
                label="သင့်စကားဝှက်ထည့်ပါ"
                autocapitalize="off"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                :rules="rules.password"
                @click:append="showPassword = !showPassword"
                outlined
              />
              <v-expand-transition>
                <v-alert
                  v-show="error"
                  dense
                  outlined
                  type="error"
                  v-text="error"
                ></v-alert>
              </v-expand-transition>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn type="submit" color="primary" block>
                ဝင်ရောက်ရန်
              </v-btn>
              <v-spacer />
            </v-card-actions>
          </v-form>
          <v-card-subtitle class="text-center">
            <v-btn
              class="mt-5"
              color="red"
              dark
              @click="signInWithGoogle()"
              icon
              large
            >
              <v-icon>mdi-google</v-icon>
            </v-btn>

            <v-btn
              class="mt-5"
              color="blue"
              dark
              @click="signInWithFacebook()"
              icon
              large
            >
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  data: () => ({
    loading: false,
    error: null,
    valid: null,
    email: "",
    password: "",
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
    autocompleteEmail() {
      if (!this.email || this.email.match(/@/g)) return;
      this.email = this.email + "@etherio.net";
    },
    signInWithEmailAndPassword() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      this.error = null;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => (this.$root.loaded = false))
        .catch((err) => {
          this.loading = false;
          switch (err.code) {
            case "auth/user-not-found":
              this.error = "အကောင့်ရှာမတွေ့ပါ";
              break;
            case "auth/wrong-password":
              this.error = "စကားဝှက်မမှန်ပါ";
              break;
            default:
              this.error = err.message || err.toString();
          }
        });
    },
    signInWithGoogle() {
      this.loading = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    signInWithFacebook() {
      this.loading = true;
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
  },
};
</script>
