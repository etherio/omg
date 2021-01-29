<template>
  <v-navigation-drawer fixed permanent expand-on-hover>
    <v-list v-if="user">
      <v-list-item class="px-2" v-if="user.photoURL" to="/profile">
        <v-list-item-avatar>
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link to="/profile">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
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
  },

  data: () => ({
    user: null,
  }),

  methods: {
    can(visible) {
      let user = this.$root.user;
      return visible ? visible.includes(user && user.role) : true;
    },
  },

  created() {
    this.user = this.$store.state.user;
  },
};
</script>
