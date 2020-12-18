<template>
  <v-container>
    <skeleton-loader v-if="loading" type="article, list-item-two-line" />
    <v-form v-else @submit.prevent="onSubmit($event)">
      <v-row>
        <v-col cols="12">
          <h2>Add New Product</h2>
        </v-col>
        <!-- Product Name -->
        <v-col cols="12">
          <v-text-field
            v-model="select.name"
            :rules="rules.name"
            hint="required"
            outlined
          >
            <template v-slot:label>
              <div>Product Name <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Item Code -->
        <v-col cols="6">
          <v-text-field
            v-model="select.code"
            :rules="rules.code"
            hint="required"
            outlined
          >
            <template v-slot:label>
              <div>Item Code <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Item Code -->
        <v-col cols="6">
          <v-text-field
            v-model="select.price"
            :rules="rules.price"
            hint="required"
            suffix="Ks."
            outlined
            required
          >
            <template v-slot:label>
              <div>Sale Price <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <v-textarea
            v-model="select.description"
            hint="optional"
            outlined
            label="Description"
            rows="4"
          />
        </v-col>

        <!-- Category -->
        <v-col cols="5">
          <v-combobox
            v-model="select.category"
            :items="categories"
            label="Category"
            clearable
            outlined
            persistent-hint
          />
        </v-col>

        <!-- Colors -->
        <v-col cols="7">
          <v-combobox
            v-model="select.colors"
            :items="colors"
            label="Colors"
            hide-selected
            multiple
            outlined
            persistent-hint
            small-chips
          />
        </v-col>
        <v-col cols="12">
          <v-file-input
            v-model="select.file"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload an image"
            prepend-icon="mdi-camera"
            label="Photo"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-col cols="12">
        <v-alert type="error" v-for="error in errors" :key="error">
          {{ error }}
        </v-alert>
        <v-card-actions>
          <v-btn type="submit" text color="primary" block outlined large>
            Save
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import meta from "../app/meta";
import product from "../app/product";
import SkeletonLoader from "../components/SkeletonLoader.vue";
import { storage, firestore } from "../firebase";

export default {
  name: "ProductSearch",

  components: {
    SkeletonLoader,
  },

  data: () => ({
    loading: false,
    errors: [],
    select: {
      name: null,
      price: null,
      description: null,
      category: null,
      colors: [],
      file: null,
    },
    rules: {
      name: [(value) => value != null],
      code: [(value) => value != null],
      price: [(value) => value != null],
    },
    colors: [],
    categories: [],
  }),

  methods: {
    validate() {
      let errors = [];
      if (!this.rules.name[0](this.select.name)) {
        errors.push("You should enter product name");
      }
      if (!this.rules.code[0](this.select.code)) {
        errors.push("You should enter item code");
      }
      if (!this.rules.price[0](this.select.price)) {
        errors.push("You should enter product price");
      }
      return errors;
    },

    async onSubmit(event) {
      let image = null,
        color = null;
      let el = event.target;
      this.errors = this.validate();
      // validate the input values
      if (this.errors.length) {
        return false;
      }
      // get server current timestamp
      let now = new Date();
      let response = await fetch(
        "https://ethereal-demo-link.netlify.app/.netlify/functions/timestamp"
      );
      now.setTime(await response.text());

      // put file to storage before saving to database if file exists
      if (this.select.file) {
        image = `${timestamp.getYear() - 100}/${timestamp.getMonth() + 1}`;
        await storage.child(image).put(this.select.file);
      }
      let product = {
        code: this.select.code,
        price: this.select.price,
        description: this.select.description,
        category: this.select.category,
        color,
        image,
        createdAt: now.getTime(),
      };
      // if (this.select.colors.length) {
      //   this.select.colors.forEach((color) => {
      //     product.color = color;
      //     firestore.doc().set(product);
      //   });
      // } else {
      //   firestore.doc().set(product);
      // }
      console.log("donne!!!", product);
    },
  },

  beforeMount() {
    meta.fetch().then(({ colors, categories }) => {
      this.loading = false;
      this.categories = categories;
      this.colors = colors;
    });
  },
};
</script>

<style>
</style>
