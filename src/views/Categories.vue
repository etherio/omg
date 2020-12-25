<template>
  <v-container class="mt-2">
    <h2 class="mb-3">Categories</h2>
    <div class="text-right">
      <add-category label="Add" icon="mdi-plus" />
    </div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th>Category Name</th>
            <th class="text-center">Products</th>
            <th><span class="sr-only">actions</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <td class="text-capitalize">{{ category.title }}</td>
            <td class="text-center">{{ category.total }}</td>
            <td class="text-right">
              <v-menu bottom left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item>
                    <v-list-item-title class="action-link">
                      Edit
                    </v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <v-list-item-title
                      class="action-link"
                      @click="deleteCategory(category)"
                    >
                      Delete
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import Category from "../app/Category";
import AddCategory from "../components/AddCategory.vue";

export default {
  data: () => ({
    categories: [],
  }),
  components: {
    AddCategory,
  },
  methods: {
    deleteCategory(cat) {
      Category.remove(cat._id).then(() => {
        this.categories = this.categories.filter((c) => c._id !== cat._id);
      });
    },
  },
  async beforeMount() {
    let categories = await Category.all();
    this.categories = categories.sort(
      (a, b) =>
        (a.title || "").substr(0, 1).toUpperCase().charCodeAt() -
        (b.title || "").substr(0, 1).toUpperCase().charCodeAt()
    );
  },
};
</script>

<style>
/*  */
</style>
