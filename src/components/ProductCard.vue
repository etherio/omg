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
    <v-img height="250" :src="product.photoURL"></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="grey--text">
        <v-chip v-if="product.code" small color="blue lighten-4">
          #{{ product.code }}
        </v-chip>
        <v-chip v-if="product.category" color="primary" small class="mx-1">
          {{ product.category }}
        </v-chip>
        <span v-for="color in product.colors" :key="color">
          <v-chip v-if="color.length" small class="ma-1">
            {{ color }}
          </v-chip>
        </span>
        <v-chip v-if="product.minAge" small class="ma-1" color="green lighten-4">
          {{ product.minAge }}yrs.
        </v-chip>
        <v-chip v-if="product.maxAge" small class="ma-1" color="green lighten-3">
          {{ product.maxAge }}yrs.
        </v-chip>
      </div>
      <div class="my-4 subtitle-1">{{ product.price }} Kyats</div>

      <div>
        {{ product.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-row justify="space-between">
        <v-btn color="blue" text>Edit</v-btn>
        <v-btn fab v-if="product.stock" outlined color="primary" small>{{
          product.stock
        }}</v-btn>
        <v-btn
          color="red"
          text
          @click="deleted()"
          :disabled="this.$root.role !== 'admin'"
          :loading="loading"
          >Delete</v-btn
        >
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",

  props: ["product", "destroy"],

  data: () => ({
    loading: false,
  }),

  methods: {
    deleted() {
      if (this.$root.role !== "admin") {
        return;
      }
      this.loading = true;
      this.destroy(this.product.id).then((res) => (this.loading = false));
    },
  },
};
</script>

<style></style>
