<template>
  <v-container>
    <v-text-field
      solo
      label="ရှာရန်"
      append-icon="mdi-magnify"
      v-model="value"
      @input="search(value)"
    />
  </v-container>
</template>

<script>
export default {
  props: {
    search: {
      required: true,
      type: Function,
    },
  },
  data: () => ({
    value: null,
  }),
};
</script>
