<template>
  <v-alert type="warning" dark>
    <v-row justify="space-between" class="font-weight-bold mx-2 py-3">
      <slot></slot>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>
