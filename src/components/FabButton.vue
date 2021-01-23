<template>
  <v-speed-dial
    v-show="$root.user && $root.fab"
    fixed
    v-model="fab"
    bottom
    right
    direction="top"
    transition="scale-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" dark fab small color="primary">
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <!-- create product -->
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          small
          color="secondary"
          v-bind="attrs"
          v-on="on"
          to="/products/new"
        >
          <v-icon>mdi-basket-plus</v-icon>
        </v-btn>
      </template>
      <span>ကုန်ပစ္စည်းအသစ်ထည့်သွင်း</span>
    </v-tooltip>

    <!-- create category -->
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          fab
          dark
          small
          color="secondary"
          v-bind="attrs"
          v-on="on"
          to="/categories?new"
        >
          <v-icon>mdi-book-plus-multiple</v-icon>
        </v-btn>
      </template>
      <span>ပစ္စည်းအမျိုးအစားထည့်သွင်း</span>
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
export default {
  data: () => ({
    fab: false,
  }),
};
</script>
