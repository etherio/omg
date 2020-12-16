<template>
  <v-container>
    <v-row align="center" justify="center" class="pb-5">
      <v-col cols="12">
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          class="pb-0"
          clearable
          solo
        />
        <v-col cols="12" class="d-flex justify-end py-0">
          <v-checkbox v-model="filter.mode[0]" class="mr-4" label="In-stock" />
          <v-checkbox v-model="filter.mode[1]" label="Out of stock" />
        </v-col>
      </v-col>
      <v-btn
        :loading="loading"
        :disable="loading"
        color="primary"
        @click="search($event)"
        class="mx-2"
        large
      >
        Search
      </v-btn>
      <v-btn
        class="mx-2"
        :depressed="Boolean(panel.length)"
        @click="panel.length ? panel.pop() : panel.push(0)"
        large
      >
        <v-icon>mdi-filter</v-icon> Filter
      </v-btn>
    </v-row>
    <v-expansion-panels v-model="panel" class="mt-5" multiple>
      <v-expansion-panel>
        <v-expansion-panel-header class="hidden"></v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="6">
              <v-select
                :items="categories"
                v-model="filter.categories"
                label="Categories"
                chips
                multiple
                solo
              />
            </v-col>
            <v-col cols="6">
              <v-select
                solo
                v-model="filter.colors"
                :items="colors"
                label="Colors"
                chips
                multiple
              />
            </v-col>
            <v-col cols="12">
              <v-label>Age Group</v-label>
              <v-range-slider
                class="mt-5 mx-10"
                v-model="filter.ageGroup"
                step=".5"
                :thumb-label="hover"
                @mouseenter.native="hover = true"
                @mouseleave.native="hover = false"
                :hint="ageGroupHint"
                :rules="rules.ageGroup"
                max="15"
                persistent-hint
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="ma-2"></div>
    <div v-if="queried.time">
      <p>
        showing {{ queried.size }} documents ({{ queried.time.toFixed(2) }}
        seconds)
      </p>
      <v-divider class="my-5"></v-divider>
      <!-- search result -->
      <v-row>
        <v-col cols="4" v-for="(item, index) in results" :key="index">
          <product-card :item="item" />
        </v-col>
      </v-row>

      <div class="text-center">
        <v-pagination v-model="page" :length="paginate.length"></v-pagination>
      </div>
    </div>
  </v-container>
</template>

<script>
import meta from "../app/meta";
import product from "../app/product";
import ProductCard from "../components/ProductCard.vue";

let MAX_SHOW_RESULTS = 10;
let docs = [];

export default {
  name: "ProductSearch",
  data: () => ({
    loading: false,
    panel: [],
    filter: {
      ageGroup: [0, 15],
      categories: [],
      colors: [],
      mode: [true, false],
    },
    rules: {
      ageGroup: [([min, max]) => max > min],
    },
    results: [],
    queried: {
      size: null,
      time: null,
    },
    page: null,
    paginate: {
      page: null,
      length: null,
      startAt: null,
      endAt: null,
    },
    categories: [],
    colors: [],
    hover: false,
  }),
  methods: {
    async search() {
      this.loading = true;
      let started = Date.now();
      let productRef = product.orderBy("stocks");
      if (!this.fetchAllProducts) {
        productRef = this.fetchInStockOnly
          ? product.where("stocks", ">", 0)
          : product.where("stocks", "<", 1);
      }
      let docRef = await productRef.get();
      docs = docRef.docs;
      this.panel = [];
      let pages = docRef.size / MAX_SHOW_RESULTS;
      let paginate = Math.round(pages);
      paginate < pages && paginate++;
      this.page = 1;
      this.paginate.length = paginate;
      this.paginate.startAt = this.paginate.startAt + MAX_SHOW_RESULTS;
      this.loading = false;
      this.queried.size = docRef.size;
      this.queried.time = (Date.now() - started) / 1000;
    },
  },
  computed: {
    ageGroupHint() {
      let [minAge, maxAge] = this.filter.ageGroup;
      if (minAge > 0 || maxAge < 15) {
        return `minimum age ${minAge} to ${maxAge} yrs.`;
      }
      return "";
    },

    fetchAllProducts() {
      return this.filter.mode[0] && this.filter.mode[1];
    },

    fetchInStockOnly() {
      return this.filter.mode[0] && !this.filter.mode[1];
    },

    fetchOutOfStockOnly() {
      return !this.filter.mode[0] && this.filter.mode[1];
    },
  },
  beforeMount() {
    meta.fetch().then(({ categories, colors }) => {
      this.colors = colors;
      this.categories = categories;
    });
  },
  watch: {
    page() {
      let p = this.page;
      let products = [];
      this.paginate.page = p;
      this.paginate.endAt = MAX_SHOW_RESULTS * p;
      this.paginate.startAt = this.paginate.endAt - MAX_SHOW_RESULTS;
      let chunkRef = docs.slice(this.paginate.startAt, this.paginate.endAt);
      chunkRef.forEach((doc) => {
        console.log(doc);
        let product = doc.data();
        products.push(product);
      });
      products = products.sort((a, b) => b.createdAt - a.createdAt);
      this.results = products;
    },
  },
  components: {
    ProductCard,
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
</style>
