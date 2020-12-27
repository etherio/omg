<template>
  <v-container>
    <h2>Dashboard</h2>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="blue darken-2" dark>
          <v-card-title>Total Products</v-card-title>
          <v-card-text
            ><h2>{{ products }}</h2></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="red darken-2" dark>
          <v-card-title>Stock in inventory</v-card-title>
          <v-card-text>
            <h2>{{ inventory }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <v-card color="yellow darken-4" dark>
          <v-card-title>Categories</v-card-title>
          <v-card-text>
            <h2>{{ categories }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Metadata from "../app/Metadata";

export default {
  data: () => ({
    products: 0,
    categories: 0,
    inventory: 0,
  }),
  beforeMount() {
    Metadata.all().then((data) => {
      let products = data.find((d) => d._id == "products");
      let categories = data.find((d) => d._id == "categories");
      let inventory = data.find((d) => d._id == "inventory");

      this.products = (products && products.count) || 0;
      this.categories = (categories && categories.count) || 0;
      this.inventory = (inventory && inventory.count) || 0;
    });
  },
};
</script>
