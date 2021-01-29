<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">
        {{ value || "n/a" }}
      </v-btn>
    </template>
    <v-card width="300">
      <v-list>
        <v-list-item>
          <v-text-field
            :type="type || 'text'"
            v-model="input"
            @input="update(input)"
            :placeholder="label"
            single-line
          />
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "InputMenuCard",
  props: {
    type: { type: String },
    label: { type: String },
    value: { required: true },
    update: { required: true, type: Function },
  },
  data: () => ({ input: null }),
  beforeMount() {
    this.input = this.value;
  },
};
</script>
