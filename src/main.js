import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "./plugins/firebase";
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
    firebase.auth().onAuthStateChanged(async (user) => {
      if (!user && this.$route.path !== "/login") {
        this.$router.push({ path: "/login" }).then(() => {
          this.loaded = true;
        });
      } else {
        const userData = user.toJSON();
        const { token, claims } = await user.getIdTokenResults(true);
        userData.token = token;
        userData.role = claims.role;
        userData.access_token = claims.access_token;
        this.user = userData;
        this.loaded = true;
      }
    });

    return h(App);
  },
}).$mount("#app");
