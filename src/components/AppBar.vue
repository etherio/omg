<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed temporary v-if="$root.user">
      <template v-slot:prepend>
        <router-link to="/profile" class="text-decoration-none">
          <v-list-item two-line>
            <v-list-item-avatar>
              <img v-if="$root.user.photoURL" :src="$root.user.photoURL" />
              <v-icon v-else large>mdi-account</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ displayName }}
              </v-list-item-title>
              <v-list-item-subtitle>
                <v-btn text small color="red" dark :to="{ path: '/logout' }">
                  အကောင့်မှထွက်ရန်
                </v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <template v-for="(item, index) in items">
            <v-list-item :to="item.path" :key="index" v-if="can(item.visible)">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark v-if="$root.user">
      <v-app-bar-nav-icon @click="drawer = true" />
      <v-toolbar-title>
        <router-link :to="{ path: '/' }">
          <v-img
            id="logo"
            alt="OMG"
            class="shrink mr-2"
            contain
            src="../assets/logo-2.png"
            transition="scale-transition"
            width="80"
          />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "AppBar",
};
</script>
