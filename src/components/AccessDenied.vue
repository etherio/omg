<template>
  <v-alert text prominent type="error" icon="mdi-cloud-alert">
    <b> You do not have permission to access this page.</b>
    <br />
    Please contact site admin for further more information.
  </v-alert>
</template>

<script>
export default {
  name: "AccessDenied",
};
</script>

<style>
</style>
