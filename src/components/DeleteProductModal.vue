<template>
  <span>
    <v-btn text @click="dialog = true" color="red" dark>
      <v-icon>mdi-delete</v-icon>
      ဖျက်ရန်
    </v-btn>

    <v-dialog v-model="dialog" max-width="500" persistent>
      <v-card>
        <v-card-title class="headline"> </v-card-title>
        <v-card-text>
          ကုန်ပစ္စည်းကို <b>ဖျက်ပစ်ရန်</b> သေချာပါသလား။
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="dialog = false" :disabled="loading">
            ပယ်ဖျက်ပါ
          </v-btn>
          <v-btn color="red" text @click="deleteProduct" :loading="loading">
            ဖျက်ပစ်ပါ
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { database, storage } from "../firebase";

export default {
  name: "delete-product-modal",
  props: {
    id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  methods: {
    async deleteProduct() {
      if (this.loading) return;
      this.loading = true;
      const inventoryMeta = database.child("metadata/collection/inventory");
      const productMeta = database.child("metadata/collection/products");
      const inventoryRef = database.child("inventory");
      const productRef = database.child("products");
      const categoryRef = database.child("categories");

      try {
        // check in inventory
        var ref = inventoryRef.child(this.id);
        var snapshot = await ref.get();
        if (snapshot.exists()) {
          var { stock } = snapshot.val();
          var { count } = (await inventoryMeta.get()).val();
          await inventoryRef.remove();
          console.log("removed from invenotroy");
          await inventoryMeta.update({ count: count - stock });
          console.log("decrement from invenotroy.meta");
        }

        // check having category
        if (this.category) {
          var ref = categoryRef.child(this.category);
          var snapshot = await ref.get();
          if (snapshot.exists()) {
            var { total } = snapshot.val();
            ref.update({ total: total - 1 });
            console.log("decrement from category");
          }
        }

        // delete images
        if (this.images.length) {
          await this.images.forEach(async (image) => {
            await storage.child(image).delete();
            console.log("deleted image from storage", image);
          });
        }

        // delete product
        await productRef.child(this.id).remove();
        console.log("product has been deleted");

        // check meta for products
        var snapshot = await productMeta.get();
        if (snapshot.exists()) {
          var { count } = snapshot.val();
          await productMeta.update({
            count: count - 1,
          });
          console.log("decrement from products.meta");
        }

        this.dialog = false;
      } catch (e) {
        console.error(e);
        alert("failed to remove the product");
      }
      this.$router.replace("/products");
    },
  },
};
</script>

<style>
html,
body {
  scroll-behavior: smooth;
}
</style>
