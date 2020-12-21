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
          <v-chip v-if="color.length" small class="ma-1">
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
      <div class="my-4 subtitle-1">
        Stock: <code>{{ product.stock || "out of stock" }}</code>
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
          >Delete</v-btn
        >
        <span>
          <v-btn icon color="primary" @click="purchase()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn icon color="primary" @click="sale()">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </span>
        <v-btn color="blue" @click="edit()" text>Edit</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { storage } from "../firebase";

const imagePlaceholder = "/assets/image.png";

export default {
  name: "ProductCard",

  props: ["_ref", "removeProduct"],

  data: () => ({
    loading: false,
    product: {},
    imageURL: imagePlaceholder,
  }),

  methods: {
    edit() {
      //
    },

    async purchase() {
      await this._ref.ref.update({
        stock: ++this.product.stock,
      });
    },

    sale() {},

    destory() {
      try {
        this.loading = true;
        this._ref.ref.delete().then(() => {
          this.removeProduct(this._ref.ref.id);
          this.loading = false;
        });
      } catch (e) {
        this.loading = false;
        this.error = "Unexcepted error";
        console.error(e);
      }
    },
  },

  async beforeMount() {
    let product = this._ref.data();
    this.product = product;
    if (this.product.image) {
      this.imageURL = await storage.child(this.product.image).getDownloadURL();
    }
  },
};
</script>

<style></style>
