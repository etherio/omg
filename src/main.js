import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { app, auth } from "./firebase";
import User from "./app/User";

const data = {
  loaded: false,
  user: null,
  overlay: () => null,
};

if (process.env.NODE_ENV === "production") {
  app.analytics();
  app.performance();
}

auth().onAuthStateChanged(async (user) => {
  User.resolve(user).then((user) => {
    data.user = user;
    data.loaded = true;
  });
});

Vue.config.productionTip = true;

new Vue({
  data,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
