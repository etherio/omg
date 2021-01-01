<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title>
        <v-btn icon to="/products">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span v-if="!loading">
          {{ name }}
          <v-chip color="secondary" class="mx-1" small>{{ code }}</v-chip>
        </span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-img :src="photoURL" :lazy-src="placeholder" alt="image">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
          <v-col cols="7" v-if="!loading">
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
      <v-card-actions v-if="!loading">
        <v-spacer></v-spacer>
        <delete-product-modal :id="id" :images="images" :category="category" />
        <a
          v-if="images.length"
          :href="photoURL + '?download=true'"
          target="_blank"
          download
        >
          <v-btn text color="primary darken-2">
            <v-icon class="mr-1">mdi-download</v-icon>
            ပုံယူရန်
          </v-btn>
        </a>
        <v-btn text @click="editing = !editing">
          <v-icon class="mr-1">mdi-pencil</v-icon>
          ပြင်ရန်
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import server from "../app/server";
import placeholder from "../assets/img/image.png";
import { databaseName, storage } from "../firebase";
import { translateAge, translateNumber } from "../app/burmese";
import DeleteProductModal from "../components/DeleteProductModal.vue";

export default {
  components: { DeleteProductModal },
  data: () => ({
    id: null,
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
    photoURL: null,
    loading: true,
    editing: false,
    placeholder,
  }),
  beforeMount() {
    let url = new URL(server.getProduct);
    this.id = this.$route.params.id;
    url.searchParams.append("dbname", databaseName);
    url.searchParams.append("id", this.id);
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
    downloadImage() {
      if (this.images.length) {
        let link = document.createElement("a");
        link.setAttribute("download", true);
        link.target = `_${this.id}`;
        link.href = this.photoURL;
        console.log(link);
        document.body.appendChild(link);
        requestAnimationFrame(() => {
          link.click();
          link.remove();
        });
      }
    },
  },

  computed: {
    priceInBurmese() {
      return translateNumber((this.price || 0).toLocaleString());
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
