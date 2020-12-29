<template>
  <v-container>
    <v-card :loading="loading" v-if="!loading">
      <v-card-title>
        <v-btn icon to="/products">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        {{ name }}
        <v-chip color="secondary" class="mx-1" small>{{ code }}</v-chip>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-img :src="photoURL" alt="image"></v-img>
          </v-col>
          <v-col cols="7">
            <v-card-subtitle id="price">
              {{ priceInBurmese }}
            </v-card-subtitle>
            <v-chip v-if="category" color="primary" class="mx-1" small>
              {{ category }}
            </v-chip>
            <v-chip
              v-if="minAge"
              id="min-age"
              class="mx-1"
              small
              color="indigo lighten-1"
              dark
            >
              {{ minAgeInBurmese }}
            </v-chip>
            <v-chip
              v-if="maxAge"
              id="max-age"
              class="mx-1"
              small
              color="indigo lighten-1"
              dark
            >
              {{ maxAgeInBurmese }}
            </v-chip>
            <p class="pt-5" v-if="description">{{ description }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="editing = !editing">
          <v-icon class="mr-2">mdi-pencil</v-icon>
          ပြုပြင်ရန်
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import server from "../app/server";
import { databaseName, storage } from "../firebase";
import { translateAge, translateNumber } from "../app/burmese";

export default {
  data: () => ({
    code: null,
    name: null,
    price: null,
    description: null,
    category: null,
    minAge: null,
    maxAge: null,
    images: [],
    colors: [],
    stock: 0,
    photoURL: "/assets/image.png",
    loading: true,
    editing: false,
  }),
  created() {
    let url = new URL(server.getProduct);
    url.searchParams.append("dbname", databaseName);
    url.searchParams.append("id", this.$route.params.id);
    axios
      .get(url, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      })
      .then(({ data }) => {
        Object.entries(data).forEach(([key, value]) => {
          this[key] = value;
          if (key === "images" && value && value.length) {
            storage
              .child(value[0])
              .getDownloadURL()
              .then((url) => {
                this.photoURL = url;
              });
          }
        });
        this.loading = false;
      })
      .catch((err) => {
        console.error(err);
        this.loading = false;
      });
  },

  methods: {
    convertBurmeseNumber(input) {
      return input
        .toString()
        .split("")
        .map((c) => burmeseNumber[c] || c)
        .join("");
    },
  },

  computed: {
    priceInBurmese() {
      return translateNumber(this.price.toLocaleString());
    },
    minAgeInBurmese() {
      return translateAge(this.minAge);
    },
    maxAgeInBurmese() {
      return translateAge(this.maxAge);
    },
  },
};
</script>

<style scoped>
#price {
  font-size: 1.2em;
  letter-spacing: 2px;
}

#price::before {
  content: "ကျပ်";
}

#min-age::after {
  content: "မှ";
  /* padding-left: 5px; */
}

#max-age::after {
  content: "ထိ";
  /* padding-left: 5px; */
}
</style>
