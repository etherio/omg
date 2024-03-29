<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex mx-3">
        <h2>ကုန်ပစ္စည်းများ</h2>
        <v-spacer />
        <v-btn text to="/products/new">
          <v-icon>mdi-plus</v-icon>
          အသစ်ထည့်ရန်
        </v-btn>
      </v-col>

      <v-col cols="12">
        <product-finder :search="search"></product-finder>
      </v-col>

      <v-col cols="12">
        <v-expand-transition>
          <v-alert v-show="error" type="error">{{ error }}</v-alert>
        </v-expand-transition>

        <v-simple-table v-if="products.length">
          <thead>
            <tr>
              <th class="text-left">အကြောင်းအရာ</th>
              <th class="text-center">စျေးနှုန်း</th>
              <th class="text-center">အမျိုးအစား</th>
              <th class="text-center">အသက်အရွယ်</th>
              <th class="text-center">‌ရေတွက်</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, index) in products"
              :key="index"
              @click="$router.push(`/products/${product.id}`)"
            >
              <td class="text-left">
                <v-row>
                  <v-col class="ma-1">
                    <v-img :src="product.photoURL" width="120">
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </v-col>
                  <v-col>
                    <b>{{ product.name }}</b>
                  </v-col>
                </v-row>
              </td>
              <td class="text-center">{{ price(product.price) }} ကျပ်</td>
              <td class="text-center">
                {{ product.category }}
              </td>
              <td class="text-center">
                <span v-if="product.minAge">
                  {{ age(product.minAge) }} မှ
                </span>
                <span v-if="product.maxAge"> {{ age(product.maxAge) }}ထိ </span>
              </td>
              <td class="text-center">{{ num(product.stocks) }} ခု</td>
            </tr>
          </tbody>
        </v-simple-table>
        <empty-table v-else-if="!loading && !product.length" :items="products">
          ကုန်ပစ္စည်းများ ရှာမတွေ့ပါ။
        </empty-table>
        <div v-else class="text-center">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </div>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ snackbarMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
          class="font-weight-bold text--lighten-2"
        >
          ပိတ်
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import server from "@/app/server";
import { translateNumber, translateAge } from "@/app/burmese";
import placeholder from "@/assets/img/image.png";
import ProductFinder from "@/components/ProductFinder.vue";
import EmptyTable from "@/components/EmptyTable.vue";

const data = () => ({
  error: null,
  snackbar: false,
  snackbarMessage: null,
  loading: true,
  products: [],
});

const components = {
  ProductFinder,
  EmptyTable,
};

export default {
  name: "Products",
  components,
  data,

  methods: {
    num(value) {
      return translateNumber(parseInt(value)) || "-";
    },
    price(value) {
      return translateNumber(parseInt(value).toLocaleString());
    },
    age(value) {
      return translateAge(parseInt(value));
    },
    viewProduct(id) {
      this.$router.replace(["product", id].join("/"));
    },
    coverImage(url) {
      url = btoa(url);
      return `${server.url}/image?height=180&url=${url}`;
    },
    search(value) {
      if (!value) {
        data.products = this.$root.store.products;
        return;
      }
      value = value.toLowerCase();
      const products = this.$root.store.products.filter(
        ({ code, name, category }) => {
          return (
            code.toLowerCase().match(value) ||
            name.toLowerCase().match(value) ||
            category.toLowerCase().match(value)
          );
        }
      );
      data.products = products;
    },
  },

  beforeMount() {
    if (this.$root.store.products.length) {
      this.loading = false;
      this.products = this.$root.store.products;
      return;
    }
    this.axios
      .get(server.products, {
        headers: { "X-Access-Token": this.$root.user.token },
      })
      .then(({ data }) => {
        return data.map((product) => {
          product.photoURL = placeholder;
          if (product.images && product.images.length) {
            product.photoURL = product.images[0];
          }
          return product;
        });
      })
      .then((products) => {
        this.$root.store.products = this.products = products;
        if (!this.products.length) {
          this.snackbar = true;
          this.snackbarMessage = "ကုန်ပစ္စည်းများရှာမတွေ့ပါ။";
        }
      })
      .catch((err) => {
        console.error(err);
        this.snackbar = true;
        this.error = this.snackbarMessage =
          "တစ်ခုခုမှားယွင်းနေပါတယ်။ နောက်တစ်ခါထပ်မံကြိုးစားကြည့်ပါ။";
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>
