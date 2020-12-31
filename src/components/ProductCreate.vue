<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-form ref="form" @submit.prevent="onSubmit($event)">
      <v-row>
        <v-col cols="12">
          <h2>
            <v-btn icon @click="$router.back()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            Add New Product
          </h2>
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
              <div>ကုန်ပစ္စည်းအမည် <b>*</b></div>
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
              <div>ကုတ်နံပါတ် <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Item Code -->
        <v-col cols="6">
          <v-text-field
            v-model="select.price"
            :rules="rules.price"
            @input="select.price = localePrice"
            suffix="ကျပ်"
            outlined
            required
            id="input-price"
          >
            <template v-slot:label>
              <div>ရောင်းစျေး <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <v-textarea
            v-model="select.description"
            outlined
            label="အကြောင်းအရာ သို့မဟုတ်် မှတ်ချက်"
            rows="4"
          />
        </v-col>

        <!-- Category -->
        <v-col cols="5">
          <v-combobox
            v-model="select.category"
            :items="categories.map((category) => category._id)"
            label="ကုန်ပစ္စည်းအမျိုးအစား"
            outlined
          />
        </v-col>

        <!-- Colors -->
        <v-col cols="7">
          <v-combobox
            v-model="select.colors"
            :items="colors.map((color) => color.title)"
            label="​ရရှိနိုင်သောအရောင်များ"
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
            prepend-icon="mdi-camera"
            label="ကုန်ပစ္စည်းဓာတ််ပုံ"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-col cols="12">
        <v-range-slider
          class="mt-5 mx-10"
          v-model="select.ageGroup"
          step=".5"
          max="15"
          label="အသက်အရွယ်အပိုင်းအခြား"
          persistent-hint
        />
        <div
          v-if="select.ageGroup[0] || select.ageGroup[1]"
          class="text-center"
          style="height: 30px; width: 100%;"
        >
          <v-chip v-text="minAge" />
          မှ
          <v-chip v-text="maxAge" />
          ထိ
        </div>
        <div v-else style="height: 30px;"></div>
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
import Color from "../app/Color";
import Category from "../app/Category";
import server from "../app/server";
import { database, storage } from "../firebase";
import { translateAge } from "../app/burmese";
import axios from "axios";
import FormData from "form-data";

const metadata = database.child("metadata");

const increment = async () => {
  let count;
  let snapshot = await metadata.child("collection/products").get();
  if (snapshot.exists()) {
    count = parseInt(snapshot.val().count) + 1;
    await metadata.child("collection/products").set({ count });
  }
  return count || 0;
};

const addCategory = async (categories, category) => {
  const dbRef = database.child("categories");
  let ref = categories.find((c) => c._id == category);
  let _id = ref ? ref._id : category;
  if (ref) {
    ref.total = parseInt(ref.total) + 1;
    await dbRef.child(`${_id}/total`).set(ref.total);
    return;
  }
  categories.push({ _id, total: 1 });
  await dbRef.child(_id).set({ total: 1 });
  await metadata
    .child("collection/categories")
    .set({ count: categories.length });
};

const addColor = (colors, color) => {
  const dbRef = database.child("colors");
  let ref = colors.find((c) => c.title == color);
  if (ref) return;
  dbRef.push({ title: color });
  colors.push({ title: color });
};

const optimizeImage = async (code, file) => {
  let data = new FormData();
  data.append("code", code);
  data.append("image", file, file.fileName);
  let response = await axios.post(server.optimizeImage, data, {
    headers: {
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    },
  });
  return response.data;
};

export default {
  name: "product-create",
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
      let product = {
        name: this.select.name,
        code: this.select.code,
        price: parseInt(this.select.price),
        description: this.select.description,
        category: this.select.category,
        colors: this.select.colors,
        images: [],
        minAge: this.select.ageGroup[0],
        maxAge: this.select.ageGroup[1],
        createdUid: this.$root.user.uid,
        createdAt: null,
      };
      let { data } = await axios.get(server.timestamp);
      product.createdAt = data.timestamp;
      if (product.category) {
        product.category = product.category.toLowerCase();
        await addCategory(this.categories, product.category);
      }
      if (product.colors.length) {
        await product.colors.forEach(
          async (color) => await addColor(this.colors, color)
        );
      }
      if (this.select.image) {
        let dt = new Date();
        let month = dt.getMonth() + 1;
        let year = dt.getYear() - 100;
        let response = await optimizeImage(this.select.code, this.select.image);
        let url = new URL(response.path);
        let path = url.pathname.slice(1).split("-")[0];
        let imagePath = `${year}/${month}/${product.createdUid}-${path}`;
        response = await fetch(url);
        await storage.child(imagePath).put(await response.blob());
        product.images.push(imagePath);
      }
      this.loading = false;
      await database.child("products").push(product);
      await increment();
      this.loading = false;
      this.$router.back();
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
    minAge() {
      return (
        (this.select.ageGroup[0] && translateAge(this.select.ageGroup[0])) ||
        "မွေးကင်းစ"
      );
    },
    maxAge() {
      return this.select.ageGroup[1] && translateAge(this.select.ageGroup[1]);
    },
    localePrice() {
      return (this.select.price || "").split(",").join("").toLocaleString();
    },
  },

  async created() {
    const updateServerStatus = () =>
      axios.get(server.status).then(({ data }) => {
        window.localStorage.setItem(
          "cached:api.etherio.net/status",
          JSON.stringify(data)
        );
      });

    this.colors = await Color.all();
    this.categories = await Category.all();

    if ("localStorage" in window) {
      let remaining = window.localStorage.getItem(
        "cached:api.etherio.net/status"
      );
      if (remaining) {
        remaining = JSON.parse(remaining);
        remaining = Math.round((remaining.expiredOn - Date.now()) / 60000);
        remaining || updateServerStatus();
      } else {
        updateServerStatus();
      }
    }
  },
};
</script>

<style lang="scss">
html,
body {
  scroll-behavior: smooth;
}

.v-menu__content {
  .v-list-item {
    text-transform: capitalize;
  }
}
</style>
