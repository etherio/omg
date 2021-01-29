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
  .then(
    (result) =>
      result && result.credential && axios.post(server.session, result)
  );

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
      if (user) {
        const userData = user.toJSON();
        const { token, claims } = await user.getIdTokenResult(true);
        userData.token = token;
        userData.role = claims.role;
        userData.access_token = claims.access_token;
        store.dispatch("SIGNIN", userData);
        this.user = userData;
        this.loaded = true;
      } else {
        store.dispatch("SIGNOUT");
        this.loaded = true;
        this.user = null;
      }
    });

    return h(App);
  },
}).$mount("#app");
