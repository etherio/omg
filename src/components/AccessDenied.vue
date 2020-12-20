<template>
  <v-container>
    <v-alert text prominent type="error" icon="mdi-bell-ring-outline">
      <b> You do not have permission to access this page.</b>
      <br />
      Please contact site admin for further more information.
    </v-alert>
    <v-spacer class="py-2"></v-spacer>
    <v-btn
      :disabled="requested"
      :loading="loading"
      color="red"
      outlined
      @click="requestAccess()"
    >
      Request an access
    </v-btn>
  </v-container>
</template>

<script>
import requestAccess from "../app/requestAccess";

export default {
  name: "AccessDenied",
  data: () => ({
    loading: false,
    requested: false,
  }),
  methods: {
    requestAccess() {
      let {
        uid,
        displayName,
        phoneNumber,
        email,
        providerData,
      } = this.$root.user;
      this.loading = true;
      requestAccess
        .push({
          uid,
          displayName,
          phoneNumber,
          email,
          provider: providerData.map((p) => p.providerId)[0],
        })
        .then(() => {
          this.loading = false;
          this.requested = true;
        });
    },
  },
};
</script>

<style></style>
