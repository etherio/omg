<template>
  <v-container fluid>
    <h2>သုံးစွဲသူများ</h2>
    <v-divider class="my-4"></v-divider>
    <v-alert
      v-if="error"
      text
      prominent
      type="error"
      icon="mdi-bell-ring-outline"
    >
      {{ error }}
    </v-alert>
    <!-- list of all users -->
    <v-card :loading="loading">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>အမည်</th>
              <th>ထုတ်လုပ်သူ</th>
              <th>ရာထူး</th>
              <th>နောက်ဆုံးတွေ့ခဲ့ချိန်</th>
              <th><span class="sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td>
                <b v-html="user.displayName"></b>
                <a
                  v-if="user.email"
                  :href="'mailto:' + user.email"
                  v-text="user.email"
                ></a>
                <a
                  v-if="user.phoneNumber"
                  :href="'tel:' + user.phoneNumber"
                  v-text="user.phoneNumber"
                ></a>
              </td>
              <td>
                <v-icon
                  v-for="(provider, index) in user.providers"
                  :key="index"
                  small
                  >{{ provider.icon }}</v-icon
                >
              </td>
              <td>
                <v-chip
                  class="chip"
                  v-if="user.role"
                  small
                  :color="user.role == 'admin' ? 'primary' : ''"
                  v-html="user.role || 'user'"
                />
              </td>
              <td>{{ user.lastLogin }}</td>
              <td>
                <v-btn
                  v-if="user.role && user.role != 'admin'"
                  small
                  icon
                  color="primary"
                  @click="setAdmin(user.uid)"
                  :disabled="loading"
                >
                  <v-icon>mdi-chess-king</v-icon>
                </v-btn>
                <v-btn
                  v-if="user.role != 'moderator'"
                  small
                  icon
                  color="primary"
                  @click="setModerator(user.uid)"
                  :disabled="loadingRole"
                >
                  <v-icon>mdi-chess-queen</v-icon>
                </v-btn>
                <v-btn
                  small
                  icon
                  color="error"
                  @click="deleteUser(user.uid)"
                  :disabled="loadingDelete"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import server from "../app/server";

const providerIcons = {
  password: {
    icon: "mdi-key",
  },
  phone: {
    icon: "mdi-cellphone",
  },
  email: {
    icon: "mdi-email",
  },
  "google.com": {
    icon: "mdi-google",
  },
  "facebook.com": {
    icon: "mdi-facebook",
  },
};

export default {
  name: "Users",

  data: () => ({
    loading: true,
    loadingDelete: false,
    loadingRole: false,
    error: null,
    users: [],
    request_access: [],
  }),

  methods: {
    setAdmin(uid) {
      this.loading = true;
      this.loadingRole = true;
      axios
        .post(
          server.setRole,
          {
            uid,
            role: "admin",
          },
          {
            headers: {
              "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
            },
          }
        )
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "admin";
          this.loading = this.loadingRole = false;
        })
        .catch((e) => {
          this.error = "Opps! Something went wrong...";
          this.loading = this.loadingRole = false;
        });
    },

    setModerator(uid) {
      this.loading = true;
      this.loadingRole = true;
      axios
        .post(
          server.setRole,
          {
            uid,
            role: "moderator",
          },
          {
            headers: {
              "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
            },
          }
        )
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "moderator";
          this.loadingRole = this.loading = false;
        })
        .catch((e) => {
          this.error = "Opps! Something went wrong...";
          this.loadingRole = this.loading = false;
        });
    },

    setUser(uid) {
      this.loading = this.loadingDelete = this.loadingRole = true;
      axios
        .post(
          server.setRole,
          {
            uid,
            role: null,
          },
          {
            headers: {
              "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
            },
          }
        )
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = null;
          this.loadingRole = this.loading = this.loadingDelete = false;
        })
        .catch((e) => {
          this.error = "Opps! Something went wrong...";
          this.loadingRole = this.loading = this.loadingDelete = false;
        });
    },

    deleteUser(uid) {
      let user = this.users.find((u) => u.uid == uid);
      if (user.role) return this.setUser(uid);
      this.loadingDelete = this.loading = true;
      axios
        .post(
          server.deleteUser,
          {
            uid,
          },
          {
            headers: {
              "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
            },
          }
        )
        .then((res) => {
          this.users = this.users.filter((user) => user.uid != uid);
          this.loadingDelete = this.loading = false;
        })
        .catch((e) => {
          this.error = "Unable to delete an user! Please try again...";
          this.loadingDelete = this.loading = false;
        });
    },
  },

  created() {
    axios
      .get(server.me, {
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
      .then((r) => console.log(r.data));
    axios
      .get(server.listUsers, {
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
      .then(({ data }) => {
        data.forEach((user) => {
          user.providers = user.providers.map(
            (provider) => providerIcons[provider]
          );
        });
        this.loading = false;
        this.users = data;
      })
      .catch((e) => {
        this.error = "Something went wrong! Please reload this page...";
        this.loading = false;
      });
  },
};
</script>

<style>
.sr-only {
  visibility: hidden;
}
</style>

<style scoped>
.chip {
  text-transform: capitalize;
}
</style>
