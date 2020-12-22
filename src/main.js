import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { app, auth } from "./firebase";
import User from "./app/User";
import "./registerServiceWorker";

const data = {
  loaded: false,
  user: null,
  denied: null,
  role: null,
  overlay: () => null,
};

app.analytics();
app.performance();

auth().onAuthStateChanged((user) => {
  if (user) {
    User.getRole().then(({ user, role }) => {
      data.role = role;
      data.denied = !Boolean(role);
      data.user = user;
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
