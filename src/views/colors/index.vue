<template>
  <v-container class="pa-4">
    <v-row>
      <v-col cols="12" class="mx-2 d-flex">
        <h2>အရောင်များ</h2>
        <v-spacer />
        <v-btn text @click="dialog = true">
          <v-icon>mdi-plus</v-icon>
          အသစ်ထည့်ရန်
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-simple-table v-if="colors.length">
          <thead>
            <tr>
              <th>အမျိုးအမည်</th>
              <th><span class="d-sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="color in colors" :key="color.id">
              <td class="color-name">
                <v-avatar size="16" v-if="color.code">
                  <!-- -->
                  <v-icon :style="`color:${color.code}`">mdi-circle</v-icon>
                </v-avatar>
                {{ color.title }}
              </td>
              <td class="text-right">
                <!--  -->
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <empty-table v-else-if="!loading && !colors.length" :items="categories">
          အရောင်များ ထည့်သွင်းထားခြင်းမရှိပါ။
        </empty-table>
        <div v-else class="text-center">
          <v-progress-circular :size="50" color="primary" indeterminate />
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="500">
      <v-form ref="form" @submit.prevent="submitColor">
        <v-card>
          <v-card-text>
            <!-- color name -->
            <v-combobox
              label="အရောင်အမည်"
              v-model="input.title"
              :rules="[(value) => !!value]"
              :items="colors.map(({ title }) => title)"
            />
            <v-color-picker
              v-model="input.code"
              dot-size="19"
              hide-canvas
              hide-inputs
              hide-mode-switch
              mode="hexa"
              show-swatches
              swatches-max-height="142"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="secondary"
              class="font-weight-bold pr-4"
              @click="$refs.form.reset() | (dialog = false)"
            >
              <v-icon small class="px-2">mdi-delete</v-icon>
              ​ပ​ယ်ဖျက်ပါ
            </v-btn>
            <v-btn type="submit" color="primary" class="font-weight-bold pr-4">
              <v-icon small class="px-2">mdi-send</v-icon>
              ထည့်သွင်းပါ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>

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
import EmptyTable from "@/components/EmptyTable.vue";
import server from "@/app/server";

export default {
  name: "Colors",

  components: {
    EmptyTable,
  },

  data: () => ({
    loading: true,
    input: {
      title: "",
      code: null,
    },
    snackbar: false,
    snackbarMessage: null,
    dialog: false,
    colors: [],
    queries: {},
  }),

  methods: {
    submitColor() {
      this.snackbarMessage = null;
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      const data = Object.assign({}, this.input);
      if (typeof data.code === "object" && "hex" in data.code) {
        data.code = data.code.hex;
      }
      this.axios
        .post(`${server.url}/colors`, data, {
          headers: {
            "x-access-token": this.$root.user.token,
          },
        })
        .then(({ data }) => {
          this.colors.unshift(data);
          this.$refs.form.reset();
          this.loading = false;
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
          this.snackbarMessage =
            err.message || "အရောင်အသစ်သွင်းထည့်သွင်းမှု မအောင်မြင်ပါ။";
          this.snackbar = true;
          this.loading = false;
        });
    },
  },

  beforeMount() {
    this.queries = this.$route.query;
    this.axios
      .get(`${server.url}/colors`, {
        headers: {
          "X-Access-Token": this.$root.user.token,
        },
      })
      .then(({ data }) => {
        this.colors = data;
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
.color-name {
  text-transform: capitalize;
}
</style>
