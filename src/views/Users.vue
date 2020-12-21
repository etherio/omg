<template>
  <v-container fluid>
    <h2>Users</h2>
    <v-divider class="my-4"></v-divider>

    <!-- list of all users -->
    <v-card>
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
                >
                  <v-icon>mdi-chess-king</v-icon>
                </v-btn>
                <v-btn
                  v-if="user.role != 'moderator'"
                  small
                  icon
                  color="primary"
                  @click="setModerator(user.uid)"
                >
                  <v-icon>mdi-chess-queen</v-icon>
                </v-btn>
                <v-btn small icon color="error" @click="deleteUser(user.uid)">
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
import requestAccess from "../app/requestAccess";

const HOST_URL = "https://serene-galileo-f84e05.netlify.app/.netlify/functions";
// const HOST_URL = "http://localhost:8888/.netlify/functions";

const PROVIDER_ICONS = {
  password: {
    icon: "mdi-key",
  },
  phone: {
    icon: "mdi-cellphone",
  },
  email: {
    icon: "mdi-email",
  },
  google: {
    icon: "mdi-google",
  },
  facebook: {
    icon: "mdi-facebook",
  },
};

export default {
  name: "Users",

  data: () => ({
    users: [],
    request_access: [],
  }),

  methods: {
    setAdmin(uid) {
      axios
        .get(
          `${HOST_URL}/role?uid=${uid}&role=admin&token=${this.$root.user.stsTokenManager.accessToken}`
        )
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "admin";
          console.log(user);
        });
    },

    setModerator(uid) {
      axios
        .get(
          `${HOST_URL}/role?uid=${uid}&role=moderator&token=${this.$root.user.stsTokenManager.accessToken}`
        )
        .then(() => {
          let user = this.users.find((user) => user.uid == uid);
          user.role = "moderator";
          console.log(user);
        });
    },

    deleteUser(uid) {
      axios
        .delete(
          `${HOST_URL}/users?token=${this.$root.user.stsTokenManager.accessToken}&uid=${uid}`
        )
        .then((res) => {
          this.users = this.users.filter((user) => user.uid != uid);
        });
    },

    acceptRequest(uid) {
      this.request_access.filter((user) => {
        if (user.uid !== uid) {
          return true;
        }
        axios({
          method: "GET",
          url: `${HOST_URL}/role?uid=${user.uid}&role=moderator&token=${this.$root.user.stsTokenManager.accessToken}`,
        });
      });
    },
  },

  beforeMount() {
    requestAccess.get().then((users) => {
      users.forEach((snapShot) => {
        let user = snapShot.toJSON();
        user.ref = snapShot.ref;
        this.request_access.push(user);
      });
    });
    axios
      .get(
        `${HOST_URL}/users?token=${this.$root.user.stsTokenManager.accessToken}`
      )
      .then(({ data }) => {
        let users = data.filter((user) => user.uid != this.$root.user.uid);
        users.forEach((user) => {
          user.providers = user.providers.map(
            (provider) => PROVIDER_ICONS[provider.split(".")[0]]
          );
        });
        this.users = users;
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
