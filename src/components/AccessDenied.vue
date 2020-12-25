<template>
  <v-container class="mt-4">
    <v-alert prominent type="error" elevation="2">
      <v-row align="center">
        <v-col class="grow">
          <b>You do not have permission to access this page.</b><br />
          Please contact site admin for further more information.
        </v-col>
        <v-col class="shrink">
          <v-btn>Take action</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </v-container>
</template>

<script>
export default {
  name: "AccessDenied",
};
</script>
