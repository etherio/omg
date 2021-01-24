<template>
  <v-container>
    <v-overlay :value="loading" class="text-center">
      <v-progress-circular 
        v-if="percent !== null" 
	size="64" 
	rotate="-90"
	:progress="percent"
	:value="percent"
	color="blue darken-2"
      >
        {{ percent }}
      </v-progress-circular>
      <v-progress-circular v-else indeterminate size="64" />
    </v-overlay>
   
    <v-form ref="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col cols="12">
          <v-btn icon @click="$router.back()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
	<v-col cols="12" id="error-message" class="pa-0 ma-0">
          <v-alert v-if="error" type="error">
            {{ error }}
          </v-alert>
	</v-col>
        <!-- Product Name -->
        <v-col cols="12">
          <v-text-field
            v-model="select.name"
            :rules="rules.name"
            outlined
            id="input-name"
          >
            <template v-slot:label>
              <div>ကုန်ပစ္စည်းအမည် <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Item Code -->
        <v-col cols="6">
          <v-text-field
            v-model="select.code"
            :rules="rules.code"
            @input="select.code = (select.code || '').toUpperCase()"
            outlined
            id="input-code"
            counter="13"
          >
            <template v-slot:label>
              <div>ကုတ်နံပါတ် <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Item Code -->
        <v-col cols="6">
          <v-text-field
            v-model="select.price"
            type="number"
            :rules="rules.price"
            @input="select.price = localePrice"
            suffix="ကျပ်"
            outlined
            required
            id="input-price"
          >
            <template v-slot:label>
              <div>စျေးနှုန်း <b>*</b></div>
            </template>
          </v-text-field>
        </v-col>

        <!-- Description -->
        <v-col cols="12">
          <v-textarea
            v-model="select.description"
            outlined
            label="အကြောင်းအရာ သို့မဟုတ်် မှတ်ချက်"
            rows="4"
          />
        </v-col>

        <!-- Category -->
        <v-col cols="12" sm="5">
          <v-combobox
            v-model="select.category"
            :items="categories.map((category) => category.title)"
            clearable
            label="ကုန်ပစ္စည်းအမျိုးအစား"
            outlined
          />
        </v-col>

        <!-- Colors -->
        <v-col cols="12" sm="7">
          <v-combobox
            v-model="select.colors"
            :items="colors.map((color) => color.title)"
            label="​ရရှိနိုင်သောအရောင်များ"
            hide-selected
            multiple
            outlined
            persistent-hint
            clearable
            small-chips
          />
        </v-col>

        <!-- Image -->
        <v-col cols="12" class="text-right">
          <v-text-field
	    type="url"
            label="ဓာတ်ပုံလင့်ခ်"
            v-model="select.imageURL"
            v-if="uploadFromUrl"
            prepend-icon="mdi-camera"
          />
          <v-file-input
            v-else
            v-model="select.image"
            accept="image/*"
            prepend-icon="mdi-camera"
            label="ကုန်ပစ္စည်းဓာတ််ပုံ"
          />
          <!-- upload from url button -->
          <v-btn
            small
            outlined
            color="primary"
            @click="uploadFromUrl = !uploadFromUrl"
            v-text="uploadFromUrl ? 'ဓာတ်ပုံတင်ရန် ' : 'URL မှပုံတင်ရန်'"
          />

          <!-- preview image -->
	  <v-expand-transition>
            <v-img
              v-show="uploadFromUrl"
              :src="select.imageURL"
              width="180"
              height="180"
            />
	  </v-expand-transition>

          <v-divider class="mt-2 mb-2"></v-divider>
        </v-col>

        <!-- age group -->
        <v-col cols="12">
          <v-label>အသက်အရွယ်</v-label>
          <v-range-slider
            class="mt-5 mx-10"
            v-model="select.ageGroup"
            step=".5"
            max="15"
          />
          <!-- label for selected age -->
          <div
            v-if="select.ageGroup[0] || select.ageGroup[1]"
            class="text-center"
            style="height: 30px; width: 100%;"
          >
            <v-chip v-text="minAge" />
            မှ
            <v-chip v-text="maxAge" />
            ထိ
          </div>
          <div v-else style="height: 30px;"></div>
        </v-col>

        <!-- submit button -->
        <v-col cols="12">
          <v-card-actions>
            <v-btn type="submit" text color="primary" block outlined large>
              သိမ်းဆည်းရန်
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import server from "@/app/server";
import { translateAge, translateBurmeseNumber } from "@/app/burmese";
import FormData from "form-data";

export default {
  name: "product-create",
  data: () => ({
    loading: true,
    connecting: false,
    uploadFromUrl: false,
    select: {
      name: null,
      code: null,
      price: null,
      description: null,
      category: null,
      colors: [],
      image: null,
      imageURL: null,
      ageGroup: [null, null],
    },
    rules: {
      name: [(value) => value != null],
      code: [(value) => value != null],
      price: [(value) => value != null, (value) => Number(value) >= 0],
    },
    colors: [],
    categories: [],
    percent: null,
    error: null,
  }),

  methods: {
    async onSubmit(event) {
      if (!this.$refs.form.validate()) {
        return this.goToRequiredField();
      }
      this.percent = 0;
      this.loading = true;
      this.$root.store.products = [];
      const productFormData = new FormData();
      const product = {
        name: this.select.name,
        code: this.select.code,
        price: parseInt(translateBurmeseNumber(this.select.price)),
        description: this.select.description || "",
        category: this.select.category || "",
        colors: this.select.colors.filter((c) => !!c),
        minAge: this.select.ageGroup[0],
        maxAge: this.select.ageGroup[1],
      };
      if (this.uploadFromUrl && this.select.imageURL) {
        productFormData.append("images", [this.select.imageURL]);
      } else if (this.select.image) {
        productFormData.append("image", this.select.image);
      }
      for (let [key, value] of Object.entries(product)) {
        productFormData.append(key, value);
      }
      this.axios.post(server.products, productFormData, {
        headers: {
          Accept: "application/json",
          "Content-Type": `multipart/form-data; boundary=${productFormData._boundary}`,
          "X-Access-Token": this.$root.user.token,
        },
	onUploadProgress(pe) {
          this.percent = (pe.loaded / pe.total) * 100;
	},
      })
        .then((data) => {
          this.$router.push({ path: "/products" });
        })
        .catch((err) => {
          this.error = "ကုန်ပစ္စည်းအားသိမ်းဆည်းမှုမအောင်မြင်ပါ။";
	  this.loading = false;
	  this.percent = null;
          document.querySelector("#error-message")
	    .scrollIntoView({ behavior: "smooth" });
        });
    },

    goToRequiredField() {
      if (!this.select.name) {
        var el = document.querySelector("#input-name");
        el.select();
        return el.scrollIntoView({ behavior: "smooth" });
      }
      if (!this.select.code) {
        var el = document.querySelector("#input-code");
        el.select();
        return el.scrollIntoView({ behavior: "smooth" });
      }
      if (!this.select.price) {
        var el = document.querySelector("#input-price");
        el.select();
        return el.scrollIntoView({ behavior: "smooth" });
      }
    },
  },

  computed: {
    minAge() {
      return (
        (this.select.ageGroup[0] && translateAge(this.select.ageGroup[0])) ||
        "မွေးကင်းစ"
      );
    },
    maxAge() {
      return this.select.ageGroup[1] && translateAge(this.select.ageGroup[1]);
    },
    localePrice() {
      return (this.select.price || "").split(",").join("").toLocaleString();
    },
  },

  beforeDestroy() {
    this.$root.fab = true;
  },

  beforeMount() {
    const { id } = this.$route.params;
    this.$root.fab = false;
    if (id) {
      if (id === 'undefined') {
        this.$root.store.products = [];
        this.error = "ထပ်မံကူးယူလိုသော ကုန်ပစ္စည်းအားရှာမတွေ့ပါ";
        this.loading = false;
	return;
      }
      // fetching data from API
      this.axios
        .get(`${server.products}/${id}`, {
          headers: { "X-Access-Token": this.$root.user.token },
        })
        .then(({ data }) => {
          this.select.name = data.name;
          this.select.code = data.code;
          this.select.price = data.price;
          this.select.description = data.description;
          this.select.category = data.category;
          this.select.colors = data.colors || [];
          this.select.imageURL = data.images[0];
          this.select.ageGroup = [data.minAge, data.maxAge];
          this.loading = false;
          if (this.select.imageURL) {
            this.uploadFromUrl = true;
          }
        })
	.catch(err => {
          this.error = "ထပ်မံကူးယူလိုသော ကုန်ပစ္စည်းအားရှာမတွေ့ပါ";
	  this.loading = false;
	});
    } else {
     this.loading = false;
    }

    this.axios
      .get(server.combo, {
        headers: { "X-Access-Token": this.$root.user.token },
      })
      .then(({ data }) => {
        this.categories = data.categories;
        this.colors = data.colors;
      });

  },
};
</script>

<style lang="scss">
html,
body {
  scroll-behavior: smooth;
}

.v-menu__content {
  .v-list-item {
    text-transform: capitalize;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
