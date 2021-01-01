<template>
  <v-container class="mt-2">
    <h2 class="mb-3">ကုန်ပစ္စည်းအမျိုးအစားများ</h2>
    <v-card :loading="loading">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>အမျိုးအစား</th>
              <th class="text-center">ကုန်ပစ္စည်းများ</th>
              <th><span class="sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody v-if="categories.length">
            <tr v-for="(category, index) in categories" :key="index">
              <td class="text-capitalize">{{ category._id }}</td>
              <td class="text-center">{{ num(category.total) }} မျိုး</td>
              <td class="text-right">
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item>
                      <v-list-item-title
                        class="action-link red--text"
                        @click="deleteCategory(category)"
                      >
                        <v-icon color="red">mdi-delete</v-icon> ဖျက်ရန်
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
          <tbody v-if="snackbarMessage">
            <tr>
              <td colspan="3">
                {{ snackbarMessage }} အသစ်တစ်ခုထည့်သွင်းရန်
                <v-btn
                  text
                  rounded
                  color="primary"
                  class="font-weight-bold"
                  to="/products/new"
                  >ဒီကိုနှိပ်</v-btn
                >ပါ။
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
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
import { translateNumber } from "../app/burmese";
import Category from "../app/Category";
import AddCategory from "../components/AddCategory.vue";

export default {
  data: () => ({
    snackbar: false,
    snackbarMessage: null,
    loading: true,
    categories: [],
  }),
  components: {
    AddCategory,
  },
  methods: {
    num(value) {
      return translateNumber(parseInt(value) || 0);
    },
    deleteCategory(cat) {
      Category.remove(cat._id).then(() => {
        this.categories = this.categories.filter((c) => c._id !== cat._id);
      });
    },
  },
  async beforeMount() {
    let categories = await Category.all();
    if (categories.length) {
      this.categories = categories.sort(
        (a, b) =>
          (a._id || "").substr(0, 1).toUpperCase().charCodeAt() -
          (b._id || "").substr(0, 1).toUpperCase().charCodeAt()
      );
    } else {
      this.categories = [];
      this.snackbar = true;
      this.snackbarMessage = "အမျိုးအစားများထည့်သွင်းထားခြင်းမရှိသေးပါ။";
    }
    this.loading = false;
  },
};
</script>

<style>
/*  */
</style>
