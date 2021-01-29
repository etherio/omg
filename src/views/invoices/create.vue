<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-btn icon @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>

      <v-col cols="12" class="d-flex">
        <v-simple-table>
          <tbody>
            <tr>
              <th>Bill To</th>
              <td>
                <input-menu-card
                  :update="(value) => (input.customerName = value)"
                  :value="input.customerName"
                  label="Customer Name"
                />
              </td>
            </tr>
            <tr>
              <th>Shipping</th>
              <td>
                <input-menu-card
                  :update="(value) => (input.shipping = value)"
                  :value="input.shipping"
                  label="Shipping Address"
                />
              </td>
            </tr>
            <tr>
              <th>Payment</th>
              <td>
                <input-menu-card
                  :update="(value) => (input.payment = value)"
                  :value="input.payment"
                  label="Payment Method"
                />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
        <v-spacer></v-spacer>
        <v-simple-table>
          <tbody>
            <tr @click="propName = 'refID'">
              <th>Ref#</th>
              <td>
                <input-menu-card
                  :update="(value) => (input.refID = value)"
                  :value="input.refID"
                  label="Reference ID#"
                />
              </td>
            </tr>
            <tr @click="propName = 'date'">
              <th>Date</th>
              <td>
                <input-menu-card
                  type="date"
                  label="Date"
                  :update="(value) => (input.date = value)"
                  :value="input.date"
                />
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import InputMenuCard from "./InputMenuCard.vue";

const components = {
  InputMenuCard,
};

export default {
  name: "NewInvoice",

  components,

  data: () => ({
    items: [],
    input: {
      customerName: null,
      date: null,
      refID: null,
      address: null,
      payment: null,
    },
    propName: null,
    propType: "text",
    menu: false,
  }),

  beforeMount() {
    const now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    if (date < 10) date = "0" + date;
    if (month < 10) month = "0" + month;
    this.input.date = `${now.getFullYear()}-${month}-${date}`;
  },

  watch: {
    propName(value) {
      this.menu = true;
      this.propType = value === "date" ? "date" : "text";
    },
  },
};
</script>
