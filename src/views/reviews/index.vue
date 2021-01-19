<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64" />
    </v-overlay>

    <v-row>
      <v-col cols="12" v-if="!reviews.length" v-show="!loading">
        စစ်ဆေးရန် အကြောင်းအရာများမရှိပါ။ ဖေ့ဘွတ်နှင့်ချိတ်ဆက်ရန်
        <v-btn
          text
          rounded
          color="primary"
          class="font-weight-bold"
          to="/facebook"
          >ဒီကိုနှိပ်</v-btn
        >ပါ။
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(review, index) in reviews"
        :key="index"
      >
        <v-card class="my-4">
          <v-img :src="review.images[0]"></v-img>
          <v-card-title>
            {{ review.message[0] }}
          </v-card-title>
          <v-card-text> </v-card-text>
          <v-card-actions>
            <v-btn text color="error" @click="disprove(review.id)">
              ပယ်ဖျက်ရန်
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn text color="primary" :to="'/reviews/' + review.id">
              အတည်ပြုရန်
            </v-btn>
          </v-card-actions>
        </v-card>
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
import ProductCreate from "@/components/ProductCreate.vue";
export default {
  data: () => ({
    reviews: [],
    loading: true,
    snackbar: false,
    snackbarMessage: null,
  }),
  methods: {
    disprove(id) {
      this.axios
        .delete(`${server.review}/${id}`, {
          headers: { "X-Access-Token": this.$root.user.token },
        })
        .then(() => {
          this.reviews = this.reviews.filter((r) => r.id !== id);
        });
    },
  },
  components: {
    ProductCreate,
  },
  beforeMount() {
    this.axios
      .get(server.review, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      })
      .then(({ data }) => {
        this.reviews = data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.reviews = [];
        this.snackbar = true;
        this.snackbarMessage = err.message;
      });
  },
};
</script>
