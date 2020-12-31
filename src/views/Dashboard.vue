<template>
  <v-container>
    <h2>မင်္ဂလာပါ‌</h2>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="blue darken-2" dark :to="{ path: '/products' }">
          <v-card-title>ကုန်ပစ္စည်း</v-card-title>
          <v-card-subtitle>အမျိုးပေါင်း</v-card-subtitle>
          <v-card-text
            ><h2>{{ translateNumber(products) }}</h2></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="red darken-2" dark :to="{ path: '/products' }">
          <v-card-title>ကုန်ပစ္စည်း</v-card-title>
          <v-card-subtitle>In-stock</v-card-subtitle>
          <v-card-text>
            <h2>{{ translateNumber(inventory) }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="yellow darken-4" dark :to="{ path: '/categories' }">
          <v-card-title>အမျိုးအစား</v-card-title>
          <v-card-text>
            <h2>{{ translateNumber(categories) }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { translateNumber } from "../app/burmese";
import Metadata from "../app/Metadata";

export default {
  data: () => ({
    products: 0,
    categories: 0,
    inventory: 0,
  }),

  methods: {
    translateNumber,
  },

  created() {
    Metadata.all().then((data) => {
      let products = data.find((d) => d._id == "products");
      let categories = data.find((d) => d._id == "categories");
      let inventory = data.find((d) => d._id == "inventory");

      this.products = (products && products.count) || "၀";
      this.categories = (categories && categories.count) || "၀";
      this.inventory = (inventory && inventory.count) || "၀";
    });
  },
};
</script>
