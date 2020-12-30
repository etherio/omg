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

    <v-img height="250" :src="imageURL"></v-img>

    <v-card-title>{{ product.name }}</v-card-title>

    <v-card-text>
      <div class="grey--text">{{ product.price }} Kyats</div>
      <div class="grey--text">
        <v-chip v-if="product.code" small color="blue lighten-4">
          #{{ product.code }}
        </v-chip>
        <v-chip v-if="product.category" color="primary" small class="mx-1">
          {{ product.category }}
        </v-chip>
        <span v-for="color in product.colors" :key="color">
          <v-chip v-if="color" small class="ma-1">
            {{ color }}
          </v-chip>
        </span>
        <v-chip
          v-if="product.minAge"
          small
          class="ma-1"
          color="green lighten-4"
        >
          {{ product.minAge }}yrs.
        </v-chip>
        <v-chip
          v-if="product.maxAge"
          small
          class="ma-1"
          color="green lighten-3"
        >
          {{ product.maxAge }}yrs.
        </v-chip>
      </div>
      <div class="my-4 subtitle-1 stock">
        Stock: <code>{{ inventory.stock || "out of stock" }}</code>
      </div>

      <div>
        <p>{{ product.description }}</p>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-row justify="space-between">
        <v-btn
          color="red"
          text
          @click="destory()"
          :disabled="this.$root.role !== 'admin'"
          :loading="loading"
        >
          Delete
        </v-btn>
        <span>
          <v-btn icon color="primary" @click="add()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon color="primary" @click="remove()">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </span>
        <v-btn color="blue" @click="edit()" text>Edit</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import Product from "../app/Product";
import Inventory from "../app/Inventory";
import placeholder from "../assets/img/image.png";

export default {
  name: "ProductCard",

  props: ["product", "removeProduct"],

  data: () => ({
    loading: false,
    imageURL: placeholder,
    inventory: {
      stock: 0,
    },
  }),

  methods: {
    async edit() {
      //
    },

    async add(qty) {
      this.inventory.stock += 1;
      await this.inventory.update();
    },

    async remove(qty = 1) {
      if (!this.inventory.stock) {
        return alert("cannot remove out of stock product");
      }
      this.inventory.stock -= 1;
      await this.inventory.update();
    },

    destory() {
      this.loading = true;
      try {
        this.product.delete().then(() => {
          this.removeProduct(this.product._id);
        });
      } catch (e) {
        this.removeProduct(this.product._id);
      }
      this.loading = false;
    },
  },

  async beforeMount() {
    if (this.product.images instanceof Array && this.product.images.length) {
      this.imageURL = await this.product.getPhotoURL();
    }
    this.inventory = new Inventory({
      id: this.product._id,
    });
    await this.inventory.get();
  },
};
</script>

<style>
.stock code {
  font-size: 1rem;
  padding: 5px 10px;
}
</style>
