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
};

app.analytics();

auth().onAuthStateChanged((user) => {
  if (user) {
    data.user = user.toJSON();
    User.canAccess(user.uid).then((access) => {
      data.denied = !access;
      data.loaded = true;
    });
  } else {
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
