<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex">
        <h2 class="heading text-center mt-3 mb-3">မင်္ဂလာပါ‌</h2>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click="resync"
          v-show="$root.user.role === 'admin'"
          :loading="synchronizing"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <dashboard-card
          color="blue darken-2"
          to="/products"
          title="ကုန်ပစ္စည်း"
          subtitle="အမျိုးပေါင်း​"
          :loading="loading"
          dark
        >
          <h2>{{ num(products) }} မျိုး</h2>
        </dashboard-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <dashboard-card
          color="red darken-2"
          to="/products"
          title="ကုန်ပစ္စည်း"
          subtitle="စုစုပေါင်း"
          :loading="loading"
          dark
        >
          <h2>{{ num(inventory) }} ခု</h2>
        </dashboard-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="4" xl="4">
        <dashboard-card
          color="orange darken-2"
          to="/products"
          title="ပစ္စည်းအမျိုးအစား"
          subtitle="စုစုပေါင်း"
          :loading="loading"
          dark
        >
          <h2>{{ num(categories) }} မျိုး</h2>
        </dashboard-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { translateNumber } from "@/app/burmese";
import DashboardCard from "@/components/DashboardCard.vue";
import DashboardCardSkeleton from "@/components/DashboardCardSkeleton.vue";
import server from "@/app/server";

export default {
  components: {
    DashboardCard,
    DashboardCardSkeleton,
  },
  data: () => ({
    products: null,
    categories: null,
    inventory: null,
    loading: true,
    synchronizing: false,
  }),

  methods: {
    num: translateNumber,
    resync() {
      this.synchronizing = true;
      this.axios
        .post(
          server.resync,
          {},
          { headers: { "X-Access-Token": this.$root.user.token } }
        )
        .then(() => {
          this.synchronizing = false;
          this.$router.go();
        });
    },
  },

  async beforeMount() {
    try {
      const { data } = await this.axios.get(server.meta, {
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
