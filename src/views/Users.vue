<template>
  <v-container fluid>
    <h2>Users</h2>
    <v-divider class="my-4"></v-divider>

    <!-- requested access users -->
    <v-card v-if="request_access.length">
      <v-card-title>Requested Access</v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Email</th>
              <th class="text-center">Provider</th>
              <th class="text-center">
                <span class="sr-only">action</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in request_access" :key="user.uid">
              <td class="text-left">
                <p>{{ user.displayName }}</p>
                <code>{{ user.uid }}</code>
              </td>
              <td class="text-left">{{ user.email || user.phoneNumber }}</td>
              <td class="text-center">{{ user.provider }}</td>
              <td class="text-center">
                <v-btn
                  color="success"
                  @click="acceptRequest(user.uid)"
                  small
                  class="ma-2"
                >
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn
                  color="error"
                  @click="deniedRequest(user.uid)"
                  small
                  class="ma-2"
                >
                  <v-icon>mdi-cancel</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

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
              <!-- <th><span class="sr-only">delete</span></th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td>
                {{ user.displayName }} <br />
                <a v-if="user.email" :href="'mailto:' + user.email">{{
                  user.email
                }}</a>
                <a v-if="user.phoneNumber" :href="'tel:' + user.phoneNumber">{{
                  user.phoneNumber
                }}</a>
              </td>
              <td>
                {{ user.providers }}
              </td>
              <td>
                <v-chip
                  class="chip"
                  v-if="user.customClaims"
                  small
                  :color="
                    roles.includes(user.customClaims.role)
                      ? 'primary'
                      : 'warning'
                  "
                  v-html="user.customClaims.role || 'user'"
                />
              </td>
              <td>{{ user.metadata.lastSignInTime }}</td>
              <!-- <td></td> -->
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

export default {
  name: "Users",

  data: () => ({
    roles: ["admin", "moderator"],
    users: [],
    request_access: [],
  }),

  methods: {
    acceptRequest(uid) {
      //this.request_access =
      this.request_access.filter((user) => {
        if (user.uid !== uid) {
          return true;
        }
        axios({
          method: "GET",
          url: `https://auth-service-relam1.herokuapp.com/auth?uid=${user.uid}&role=moderator`,
          headers: {
            "X-Access-Token": this.$root.user.stsTokenManager.accessToken,
            "X-Refresh-Token": this.$root.user.stsTokenManager.refreshToken,
          },
        });
      });
    },

    deniedRequest(uid) {
      this.request_access = this.request_access.filter((user) => {
        if (user.uid !== uid) {
          return true;
        }
        user.ref.remove();
      });
    },
  },

  beforeMount() {
    console.clear();

    requestAccess.get().then((users) => {
      users.forEach((snapShot) => {
        let user = snapShot.toJSON();
        user.ref = snapShot.ref;
        this.request_access.push(user);
      });
    });

    axios
      .get("https://auth-service-relam1.herokuapp.com/auth/users", {
        headers: {
          "x-access-token": this.$root.user.stsTokenManager.accessToken,
          "x-refresh-token": this.$root.user.stsTokenManager.refreshToken,
        },
      })
      .then(
        ({ data: { users } }) =>
          (this.users = users.map((user) => ({
            ...user,
            providers: user.providerData.map((provider) => provider.providerId),
          })))
      );
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
