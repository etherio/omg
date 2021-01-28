import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
import User from "./app/User";
import server from "./app/server";
import App from "./App.vue";

Vue.use(VueAxios, axios);

Vue.config.productionTip = true;

firebase
  .auth()
  .getRedirectResult()
  .then((result) => {
    if (result && result.credential) {
      axios.post(server.session, result);
    }
  });

new Vue({
  data: {
    loaded: false,
    fab: false,
    user: null,
    overlay: () => null,
    store: { products: [] },
  },
  store,
  router,
  vuetify,
  render(h) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user && this.$route.path !== "/login") {
        this.$router.push({ path: "/login" }).then(() => {
          this.loaded = true;
        });
      } else {
        User.resolve(user).then(async (user) => {
          this.user = user;
          this.loaded = true;
        });
      }
    });

    return h(App);
  },
}).$mount("#app");
