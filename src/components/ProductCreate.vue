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
            @input="select.code = (select.code || '').toUpperCase()"
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
            @input="select.price = localePrice"
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
            outlined
            label="Description"
            rows="4"
          />
        </v-col>

        <!-- Category -->
        <v-col cols="5">
          <v-combobox
            v-model="select.category"
            :items="categories.map((category) => category._id)"
            label="Category"
            outlined
            persistent-hint
          />
        </v-col>

        <!-- Colors -->
        <v-col cols="7">
          <v-combobox
            v-model="select.colors"
            :items="colors.map((color) => color.title)"
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
        <v-label>Age Group</v-label>
        <v-range-slider
          class="mt-5 mx-10"
          v-model="select.ageGroup"
          step=".5"
          :thumb-label="hover"
          @input="hover = true"
          max="15"
          persistent-hint
        />
      </v-col>
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
import Category from "../app/Category";
import Color from "../app/Color";
import Product from "../app/Product";

export default {
  name: "ProductCreate",

  data: () => ({
    loading: false,
    hover: false,
    select: {
      name: null,
      code: null,
      price: null,
      description: null,
      category: null,
      colors: [],
      image: null,
      ageGroup: [null, null],
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
      let product = new Product();
      product.name = this.select.name;
      product.code = this.select.code;
      product.price = Number(this.select.price);
      product.description = this.select.description;
      product.category = this.select.category;
      product.colors = this.select.colors;
      product.images = [this.select.image];
      product.minAge = this.select.ageGroup[0];
      product.maxAge = this.select.ageGroup[1];
      product.createdAt = Date.now();
      product.createdUid = this.$root.user.uid;
      if (product.category) {
        let categoryRef = this.categories.find(
          (cat) => cat._id.toLowerCase() == product.category.toLowerCase()
        );
        await categoryRef.update({ total: categoryRef.total++ });
      }
      await product.save();
      this.$refs.form.reset();
      this.loading = false;
      // this.$router.go("/search");
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

  computed: {
    localePrice() {
      return (this.select.price || "").split(",").join("").toLocaleString();
    },
  },

  async beforeMount() {
    this.colors = await Color.all();
    this.categories = await Category.all();
  },
};
</script>

<style>
html,
body {
  scroll-behavior: smooth;
}
</style>
