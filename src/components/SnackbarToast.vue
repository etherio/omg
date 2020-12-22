<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="closed">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
let eventId;

export default {
  name: "SnackbarToast",

  props: ["text", "closed"],
};
</script>

<style></style>
