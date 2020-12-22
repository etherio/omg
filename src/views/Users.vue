<template>
  <v-container fluid>
    <h2>Users</h2>
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
              <th>Name</th>
              <th>Providers</th>
              <th>Role</th>
              <th>Last Login</th>
              <th><span class="sr-only">actions</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td>
                {{ user.displayName }} <br />
                <a v-if="user.email" :href="'mailto:' + user.email">
                  {{ user.email }}
                </a>
                <a v-if="user.phoneNumber" :href="'tel:' + user.phoneNumber">
                  {{ user.phoneNumber }}
                </a>
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
      let url = server.role;
      this.loading = true;
      this.loadingRole = true;
      url.searchParams.append("uid", uid);
      url.searchParams.append("role", "admin");
      axios({
        url,
        method: "POST",
        data: JSON.stringify({ uid, role: "admin" }),
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "admin";
          this.loading = this.loadingRole = false;
        })
        .catch((e) => {
          this.error = "Unexcepted error occured";
          this.loading = this.loadingRole = false;
        });
    },

    setModerator(uid) {
      let url = server.role;
      this.loading = true;
      this.loadingRole = true;
      url.searchParams.append("uid", uid);
      url.searchParams.append("role", "moderator");
      axios({
        url,
        method: "POST",
        data: JSON.stringify({ uid, role: "moderator" }),
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "moderator";
          this.loadingRole = this.loading = false;
        })
        .catch((e) => {
          this.error = "Unexcepted error occured";
          this.loadingRole = this.loading = false;
        });
    },

    setUser(uid) {
      let url = server.role;
      this.loading = this.loadingDelete = this.loadingRole = true;
      url.searchParams.append("uid", uid);
      axios({
        url,
        method: "POST",
        data: JSON.stringify({
          uid,
        }),
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = null;
          this.loadingRole = this.loading = this.loadingDelete = false;
        })
        .catch((e) => {
          this.error = "Unexcepted error occured";
          this.loadingRole = this.loading = this.loadingDelete = false;
        });
    },

    deleteUser(uid) {
      let user = this.users.find((u) => u.uid == uid);
      if (user.role) return this.setUser(uid);
      let url = server.users;
      this.loadingDelete = this.loading = true;
      url.searchParams.append("uid", uid);
      axios({
        url,
        method: "DELETE",
        headers: {
          "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
        },
      })
        .then((res) => {
          this.users = this.users.filter((user) => user.uid != uid);
          this.loadingDelete = this.loading = false;
        })
        .catch((e) => {
          this.error = "Unexcepted error occured";
          this.loadingDelete = this.loading = false;
        });
    },
  },

  beforeMount() {
    let url = server.users;
    axios({
      url,
      method: "GET",
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
        this.error = "Unexcepted error occured";
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
