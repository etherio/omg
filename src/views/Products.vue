<template>
  <div class="products">
    <!-- <product-create /> -->
    <v-card :loading="loading">
      <v-card-title>ကုန်ပစ္စည်းများ</v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn text to="/product/new">
          <v-icon>mdi-plus</v-icon>
          အသစ်ထည့်ရန်
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-simple-table>
          <template>
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
                @click="viewProduct(product.id)"
              >
                <td class="text-left">
                  <v-row>
                    <v-col>
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
                <td class="text-center">
                  {{ price(product.price) }}
                </td>
                <td class="text-center">
                  {{ product.category }}
                </td>
                <td class="text-center">
                  <span v-if="product.minAge">
                    {{ age(product.minAge) }} မှ
                  </span>
                  <span v-if="product.maxAge">
                    {{ age(product.maxAge) }}ထိ
                  </span>
                </td>
                <td class="text-center">{{ product.stock }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import server from "../app/server";
import ProductCreate from "../components/ProductCreate.vue";
import { databaseName, database, storage } from "../firebase";
import { translateNumber, translateAge } from "../app/burmese";
import placeholder from "../assets/img/image.png";

export default {
  name: "Products",
  data: () => ({
    loading: true,
    products: [],
  }),
  components: {
    ProductCreate,
  },

  methods: {
    price(value) {
      return translateNumber(value.toLocaleString());
    },

    age(value) {
      return translateAge(value.toLocaleString());
    },

    viewProduct(id) {
      this.$router.replace(["product", id].join("/"));
    },
  },

  created() {
    let url = new URL(server.listProducts);
    url.searchParams.append("dbname", databaseName);
    axios
      .get(url, {
        headers: { "X-Access-Token": this.$root.user.token },
      })
      .then(({ data }) => {
        const db = database.child("inventory");
        this.products = data.map((product) => {
          product.photoURL = placeholder;
          product.stock = 0;

          db.child(product.id)
            .child("stock")
            .get()
            .then((inventory) => {
              return inventory.exists() ? inventory.val() : "-";
            })
            .then((value) => {
              product.stock = value;
            });

          if (product.images && product.images.length) {
            storage
              .child(product.images[0])
              .getDownloadURL()
              .then((url) => {
                product.photoURL = url;
              });
          }
          return product;
        });
        this.loading = false;
      });
  },
};
</script>
