<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" class="mx-2 d-flex">
        <h2>ကုန်ပစ္စည်းအမျိုးအစားများ</h2>
        <v-spacer />
        <v-btn text @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
          အသစ်ထည့်ရန်
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-simple-table v-if="categories.length">
          <thead>
            <tr>
              <th>အမျိုးအမည်</th>
              <th><span class="d-sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <td class="category-name">{{ category.title }}</td>
              <td class="text-right">
                <!--  -->
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <empty-table
          v-else-if="!loading && !categories.length"
          :items="categories"
        >
          ကုန်ပစ္စည်းအမျိုးအစားများ ထည့်သွင်းထားခြင်းမရှိပါ။
        </empty-table>
        <div v-else class="text-center">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500px">
      <v-form ref="form" @submit.prevent>
        <v-card>
          <v-card-text>
            <!-- category name -->
            <v-combobox
              label="အမျိုးအမည် *"
              v-model="input.title"
              :items="categories.map(({ title }) => title)"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              class="font-weight-bold pr-4"
              @click="resetForm"
            >
              <v-icon small class="px-2">mdi-delete</v-icon>
              ​ပ​ယ်ဖျက်ပါ
            </v-btn>
            <v-btn color="primary" class="font-weight-bold pr-4">
              <v-icon small class="px-2">mdi-send</v-icon>
              ထည့်သွင်းပါ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>

<script>
import EmptyTable from "@/components/EmptyTable.vue";
import server from "@/app/server";

export default {
  name: "Categories",

  components: {
    EmptyTable,
  },

  data: () => ({
    loading: true,
    input: {
      title: null,
    },
    dialog: false,
    categories: [],
  }),

  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.dialog = false;
    },
  },

  beforeMount() {
    this.axios
      .get(server.combo, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      })
      .then(({ data }) => {
        this.categories = data.categories;
        this.loading = false;
        this.dialog = "new" in this.$route.query;
        this.dialog && this.$router.push(this.$route.path);
      })
      .catch((e) => {
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.category-name {
  text-transform: capitalize;
}
</style>
