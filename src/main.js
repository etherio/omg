import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { app, auth } from "./firebase";
import User from "./app/User";

const data = {
  loaded: false,
  user: null,
  denied: null,
  role: null,
  overlay: () => null,
};

app.analytics();

auth().onAuthStateChanged((user) => {
  if (user) {
    User.getRole().then((role) => {
      data.role = role;
      data.denied = !Boolean(role);
      data.user = user.toJSON();
      data.loaded = true;
    });
  } else {
    data.role = null;
    data.user = null;
    data.loaded = true;
  }
});

Vue.config.productionTip = true;

new Vue({
  data,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
