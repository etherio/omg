<template>
  <v-container>
    <h2 class="text-center mt-3 mb-3">မင်္ဂလာပါ‌</h2>
    <v-row>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <DashboardCardSkeleton v-if="loading" />
        <v-card color="blue darken-2" dark to="/products" v-else>
          <v-card-title>ကုန်ပစ္စည်း</v-card-title>
          <v-card-subtitle>အမျိုးပေါင်း</v-card-subtitle>
          <v-card-text
            ><h2>{{ num(products) }} မျိုး</h2></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <DashboardCardSkeleton v-if="loading" />
        <v-card color="red darken-2" dark to="/products" v-else>
          <v-card-title>ကုန်ပစ္စည်း</v-card-title>
          <v-card-subtitle>စုစုပေါင်း</v-card-subtitle>
          <v-card-text>
            <h2>{{ num(inventory) }} ခု</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <DashboardCardSkeleton v-if="loading" />
        <v-card color="yellow darken-4" dark to="/categories" v-else>
          <v-card-title>ကုန်ပစ္စည်းအမျိုးအစား</v-card-title>
          <v-card-subtitle>စုစုပေါင်း</v-card-subtitle>
          <v-card-text>
            <h2>{{ num(categories) }} မျိုး</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { translateNumber } from "../app/burmese";
import DashboardCardSkeleton from "../components/DashboardCardSkeleton.vue";
import server from "../app/server";

export default {
  components: {
    DashboardCardSkeleton,
  },
  data: () => ({
    products: 0,
    categories: 0,
    inventory: 0,
    loading: true,
  }),

  methods: {
    num: translateNumber,
  },

  async beforeMount() {
    try {
      const { data } = await this.axios.get(server.metadata, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      });
      this.products = data.products || 0;
      this.categories = data.categories || 0;
      this.inventory = data.inventory || 0;
    } finally {
      this.loading = false;
    }
  },
};
</script>
