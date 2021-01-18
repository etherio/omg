<template>
  <v-container>
    <v-card :loading="loading">
      <v-card-title>
        <v-btn icon class="mr-2" to="/products">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <span v-if="name">
          {{ name }}
          <v-chip v-if="code" color="secondary" class="mx-1" small>
            {{ code }}
          </v-chip>
        </span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="5">
            <a :href="photoURL" target="_blank" download>
              <v-img :src="photoURL" :lazy-src="placeholder" alt="image">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular indeterminate color="grey lighten-5" />
                  </v-row>
                </template>
              </v-img>
            </a>
          </v-col>
          <v-col cols="12" sm="7" v-if="price">
            <v-card-subtitle id="price" class="font-weight-bold">
              {{ priceInBurmese }}
            </v-card-subtitle>
            <p v-if="owner">
              <a href="#">{{ ownerName }}</a> မှ
              <a href="#">{{ createdDateTime }}</a> တွင်
              <span v-text="owner.edited ? 'ပြန်​​​​​ပြင်' : 'စတင်'"></span
              >ခဲ့သည်။
            </p>

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
            <v-card-subtitle v-if="description">
              {{ description }}
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <delete-product-modal
          :deleteProduct="deleteProduct"
          :loading="loading"
        />
        <v-btn
          text
          color="primary darken-2"
          :to="{ path: '/products/new/' + id }"
        >
          <v-icon class="mr-1">mdi-content-copy</v-icon>
          ပွားရန်
        </v-btn>
        <v-btn text :to="`/products/edit/${$route.params.id}`">
          <v-icon class="mr-1">mdi-pencil</v-icon>
          ပြင်ရန်
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-divider class="mt-4 mb-2"></v-divider>
    <v-card :loading="loading">
      <v-card-title>
        ကုန်သွင်း/ကုန်ထုတ်
      </v-card-title>
      <v-card-subtitle class="pt-2">
        ကုန်ပစ္စည်း(လက်ကျန်) <b>{{ num(stocks) }} ခု</b>
      </v-card-subtitle>
      <v-card-text>
        <!--  -->
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <!-- new records -->
        <v-btn @click="ledger = true">
          <v-icon>mdi-plus</v-icon> စာရင်းသွင်းရန်
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="ledger" max-width="500" persistent>
      <v-form @submit.prevent="submitLedger" ref="ledger">
        <v-card>
          <v-card-title>
            ကုန်ပစ္စည်းစာရင်းသွင်းခြင်း
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="ledgerData.value"
              label="အရေအတွက်"
              :rules="required"
              :items="quanties"
            ></v-select>
            <v-text-field
              v-model="ledgerData.description"
              label="အကြောင်းအရာ"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="grey"
              text
              @click="ledger = false"
              :disabled="loading"
            >
              ပယ်ဖျက်ပါ
            </v-btn>
            <v-btn color="red" text :loading="loading" type="submit">
              စာရင်းသွင်းပါ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import server from "@/app/server";
import placeholder from "@/assets/img/image-dark.png";
import placeholderLight from "@/assets/img/image.png";
import {
  translateAge,
  translateDateTime,
  translateNumber,
} from "@/app/burmese";
import DeleteProductModal from "@/components/DeleteProductModal.vue";

export default {
  components: {
    DeleteProductModal,
  },
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
    stocks: 0,
    photoURL: null,
    createdAt: true,
    updatedAt: true,
    editing: false,
    placeholder,
    uid: null,
    loading: true,
    ledger: false,
    ledgerData: {
      description: null,
      value: null,
    },
    required: [(value) => !!value],
  }),

  methods: {
    async submitLedger() {
      if (this.loading) return;
      if (!this.$refs.ledger.validate()) return;
      this.loading = true;
      await this.axios.post(`${server.stocks}/${this.id}`, this.ledgerData, {
        headers: { "x-access-token": this.$root.user.token },
      });
      this.stocks += this.ledgerData.value;
      this.ledgerData = { value: null, description: null };
      this.loading = this.ledger = false;
    },
    async deleteProduct() {
      if (this.loading) return;
      this.loading = true;
      const { status, statusText } = await this.axios.delete(
        `${server.products}/${this.$route.params.id}`,
        {
          headers: {
            "X-Access-Token": this.$root.user.token,
          },
        }
      );

      this.$router.push({ path: "/products" });
    },

    num: translateNumber,
  },

  beforeMount() {
    let id = this.$route.params.id;
    this.axios
      .get(`${server.products}/${id}`, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      })
      .then(({ data }) => {
        for (let key in data) {
          this[key] = data[key];
          if (key === "images") {
            this.photoURL = data[key][0] || placeholderLight;
          }
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
        this.loading = false;
      });
  },

  computed: {
    quanties() {
      const { stocks } = this;
      const results = [];
      for (let i = 0; i < 5; i++) {
        results.push((i + 1) * 10);
      }
      for (let i = 0; i < 10; i++) {
        results.push(i + 1);
      }
      for (let i = 0; i < stocks; i++) {
        results.push((i + 1) * -1);
      }
      return results.sort((a, b) => b - a);
    },
    priceInBurmese() {
      return translateNumber((this.price || 0).toLocaleString());
    },
    minAgeInBurmese() {
      return translateAge(this.minAge);
    },
    maxAgeInBurmese() {
      return translateAge(this.maxAge);
    },
    createdDateTime() {
      return translateDateTime(
        new Date(this.updatedAt || this.createdAt),
        "d-m-Y(Dနေ့)၊ A h:i"
      );
    },
    ownerName() {
      return this.owner.name || this.owner.email;
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
}

#max-age::after {
  content: "ထိ";
}
</style>
