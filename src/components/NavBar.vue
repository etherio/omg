<template>
  <v-navigation-drawer app fixed permanent :mini-variant="mini">
    <v-list>
      <v-list-item link to="/profile" v-if="user">
        <v-list-item-avatar>
          <v-img v-if="user.photoURL" :src="user.photoURL"></v-img>
          <v-avatar size="42">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="subtitle-1">
            {{ user.displayName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>{{ mini ? "mdi-chevron-right" : "mdi-chevron-left" }}</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon to="/logout" small v-if="user">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <template v-for="(item, index) in items">
      <v-list-item :to="item.path" :key="index" v-if="can(item.visible)">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    items: {
      type: Array,
      required: true,
    },
    can: {
      type: Function,
      required: true,
    },
    user: {
      type: Object,
    },
  },

  data: () => ({
    mini: false,
  }),
};
</script>
