<template>
  <v-row>
    <v-col cols="12" md="4">
      <v-sheet class="pa-3">
        <v-skeleton-loader :type="type" class="mx-auto"></v-skeleton-loader>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: ["type"],
};
</script>

<style>
</style>
