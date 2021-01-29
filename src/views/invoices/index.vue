<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex">
        <div class="title">Invoices</div>
        <v-spacer></v-spacer>
        <v-btn text to="/invoices/new">
          <v-icon>mdi-plus</v-icon>
          အသစ်ပြုလုပ်ရန်
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Invoices",
};
</script>
