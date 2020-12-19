<template>
  <v-card :loading="loading" class="mx-auto my-12">
    <!-- max-width="374" -->
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="250" :src="item.photoURL"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>

    <v-card-text>
      <div class="grey--text">
        <v-chip v-if="item.code" small color="blue lighten-4">
          #{{ item.code }}
        </v-chip>
        <v-chip v-if="item.category" color="primary" small class="mx-1">
          {{ item.category }}
        </v-chip>
        <v-chip v-if="item.color" small class="ma-1">
          {{ item.color }}
        </v-chip>
        <v-chip v-if="item.minAge" small class="ma-1" color="green lighten-4">
          {{ item.minAge }}yrs.
        </v-chip>
        <v-chip v-if="item.maxAge" small class="ma-1" color="green lighten-3">
          {{ item.maxAge }}yrs.
        </v-chip>
      </div>
      <div class="my-4 subtitle-1">{{ item.price }} Kyats</div>

      <div>
        {{ item.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-row justify="space-between">
        <v-btn color="blue" text @click="reserve">Edit</v-btn>
        <v-btn fab v-if="item.stock" outlined color="primary" small>{{
          item.stock
        }}</v-btn>
        <v-btn color="red" text @click="reserve">Delete</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",

  props: ["item"],

  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style>
</style>
