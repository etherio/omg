<template>
  <v-container fluid>
    <h2>User Profile</h2>
    <v-divider class="mt-2 py-5"></v-divider>
    <v-alert v-if="error" dense outlined type="error" v-html="error"></v-alert>

    <v-row justify="space-between" align="start">
      <v-col lg="4" xl="4" sm="4" cols="12">
        <v-avatar class="profile" color="grey" size="200">
          <v-img :src="$root.user.photoURL || '/assets/image.png'"></v-img>
        </v-avatar>
      </v-col>
      <v-col lg="8" xl="8" sm="8" cols="12">
        <v-text-field
          v-model="name"
          label="Display Name"
          :placeholder="$root.user.displayName || ' '"
          outlined
        />
        <v-text-field
          v-model="email"
          label="Email Address"
          :placeholder="$root.user.email || ''"
          outlined
        />
        <v-text-field
          v-model="phone"
          label="Phone Number"
          :placeholder="$root.user.phoneNumber || ' '"
          outlined
        />
        <v-btn color="primary" large
          ><v-icon class="pr-2">mdi-content-save</v-icon> Save</v-btn
        >
      </v-col>
      <v-col cols="6">
        <v-card-title>Created On</v-card-title>
        <v-card-text>{{ createdAt }}</v-card-text>
      </v-col>
      <v-col cols="6">
        <v-card-title>Last Login</v-card-title>
        <v-card-text>{{ lastLoginAt }}</v-card-text>
      </v-col>
      <v-col cols="12">
        <v-btn color="error" @click="deleteAccount()" class="pl-8 pr-10"
          ><v-icon class="pr-2">mdi-delete</v-icon> Delete Account</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "../firebase";

export default {
  name: "Profile",
  data: () => ({
    email: null,
    name: null,
    password: null,
    phone: null,
    error: null,
  }),

  methods: {
    async deleteAccount() {
      if (!confirm("Are you sure to delete this account?")) {
        return;
      }
      try {
        await auth().currentUser.delete();
        this.$root.role = null;
        this.$root.user = null;
      } catch (e) {
        switch (e.code) {
          case "auth/requires-recent-login":
            this.error =
              "<b>Unable to delete your account!</b><br>Please login again to delete this account.";
            break;
          default:
            this.error = e.message;
        }
      }
    },
  },

  computed: {
    createdAt() {
      let dt = new Date();
      dt.setTime(this.$root.user.createdAt);
      // return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${dt.toTimeString().split(" ")[0]}`;
      return `${dt.toDateString()}, ${dt.toTimeString().split(" ")[0]}`;
    },
    lastLoginAt() {
      let dt = new Date();
      dt.setTime(this.$root.user.lastLoginAt);
      // return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} ${dt.toTimeString().split(" ")[0]}`;
      return `${dt.toDateString()}, ${dt.toTimeString().split(" ")[0]}`;
    },
  },
};
</script>

<style></style>
