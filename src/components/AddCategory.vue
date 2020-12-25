<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark :bind="attrs" v-on="on">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        <span v-if="label">{{ label }}</span>
      </v-btn>
    </template>
    <v-form @submit.prevent="addCategory" ref="createCategoryForm">
      <v-card>
        <v-card-text class="pt-10">
          <v-text-field v-model="title" label="Category" autofocus outlined />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="grey" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" text @click="addCategory">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import Category from "../app/Category";

export default {
  name: "AddCategory",
  props: ["label", "icon"],
  data: () => ({
    dialog: false,
    title: null,
  }),
  methods: {
    addCategory() {
      let category = new Category();
      category.title = this.title.toLowerCase();
      category.save().then(() => {
        this.$parent.categories.push(category.toJSON());
        this.title = null;
        this.$refs.createCategoryForm.reset();
        this.dialog = false;
      });
    },
  },
};
</script>
