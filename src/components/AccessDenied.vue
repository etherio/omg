<template>
  <v-container>
    <v-alert text prominent type="error" icon="mdi-bell-ring-outline">
      <b> You do not have permission to access this page.</b>
      <br />
      Please contact site admin for further more information.
    </v-alert>
  </v-container>
</template>

<script>
import requestAccess from "../app/requestAccess";

export default {
  name: "AccessDenied",
};
</script>

<style></style>
