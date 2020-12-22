<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-form ref="form" @submit.prevent="onSubmit($event)">
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
            id="input-name"
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
            @change="select.code = select.code.toUpperCase()"
            hint="required"
            outlined
            id="input-code"
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
            id="input-price"
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
            v-model="select.image"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload an image"
            prepend-icon="mdi-camera"
            label="Photo"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-col cols="12">
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
import axios from "axios";
import server from "../app/server";
import category from "../app/category";
import color from "../app/color";
import product from "../app/product";
import { storage, firestore } from "../firebase";

export default {
  name: "ProductCreate",

  data: () => ({
    loading: false,
    select: {
      name: null,
      code: null,
      price: null,
      description: null,
      category: null,
      colors: [],
      image: null,
      minAge: null,
      maxAge: null,
    },
    rules: {
      name: [(value) => value != null],
      code: [(value) => value != null],
      price: [(value) => value != null, (value) => Number(value) >= 0],
    },
    colors: [],
    categories: [],
  }),

  methods: {
    async onSubmit(event) {
      if (!this.$refs.form.validate()) {
        return this.goToRequiredField();
      }
      this.loading = true;
      let {
        data: { timestamp },
      } = await axios.get(server.timestamp);
      let now = new Date();
      now.setTime(timestamp);

      let newProduct = {
        name: this.select.name,
        code: this.select.code,
        price: this.select.price,
        description: this.select.description,
        category: this.select.category,
        colors: this.select.colors,
        image: null,
        createdAt: now,
        uid: this.$root.user.uid,
        minAge: null,
        maxAge: null,
      };

      if (this.select.image) {
        // create image path
        let [y, m] = [now.getYear() - 100, now.getMonth() + 1];
        newProduct.image = `${y}/${m}/${newProduct.uid}/${timestamp}`;
        // optimize image
        //...
        // upload to storage
        let storageRef = await storage
          .child(newProduct.image)
          .put(this.select.image);
      }

      await product.doc().set(newProduct);

      try {
        if (
          newProduct.category &&
          !this.categories.includes(newProduct.category.toLowerCase())
        ) {
          await category.push(newProduct.category.toLowerCase());
          this.categories.push(newProduct.category.toLowerCase());
        }

        if (newProduct.colors.length) {
          let newColors = newProduct.colors.filter(
            (color) => !this.colors.includes(color.toLowerCase())
          );
          if (newColors.length) {
            newColors.forEach(async (c) => {
              await color.push(c.toLowerCase());
              this.colors.push(c.toLowerCase());
            });
          }
        }
      } catch (e) {
        console.warn(e);
      }
      this.loading = false;
      this.$refs.form.reset();
    },

    goToRequiredField() {
      if (!this.select.name) {
        var el = document.querySelector("#input-name");
        el.select();
        return el.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
      if (!this.select.code) {
        var el = document.querySelector("#input-code");
        el.select();
        return el.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
      if (!this.select.price) {
        var el = document.querySelector("#input-price");
        el.select();
        return el.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      }
    },
  },

  async beforeMount() {
    let colors = await color.get();
    let categories = await category.get();
    this.colors = Object.values(colors.toJSON());
    this.categories = Object.values(categories.toJSON());
  },
};
</script>

<style></style>
