<template>
  <dashboard-card-skeleton v-if="loading" />
  <v-card :color="color" :to="to" v-bind="$attrs" v-else>
    <v-card-title v-text="title" />
    <v-card-subtitle v-if="subtitle" v-text="subtitle" />
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
import DashboardCardSkeleton from "./DashboardCardSkeleton.vue";
export default {
  components: {
    DashboardCardSkeleton,
  },
  props: {
    color: {
      required: true,
    },
    to: {
      required: true,
    },
    title: {
      required: true,
    },
    subtitle: {
      required: true,
    },
    loading: {
      required: true,
    },
  },
};
</script>
