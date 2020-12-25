<template>
  <div class="products">
    <product-create />
  </div>
</template>

<script>
import ProductCreate from "../components/ProductCreate.vue";

export default {
  name: "Products",
  components: {
    ProductCreate,
  },
};
</script>
