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
    user: {},
    loggedIn: false,
    overlay: () => null,
    store: { products: [] },
  },
  store,
  router,
  vuetify,
  render(h) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.toJSON();
        user.getIdTokenResult(true).then(({ token, claims }) => {
          userData.token = token;
          userData.role = claims.role;
          userData.access_token = claims.access_token;
          // store.dispatch("SIGNIN", userData);
          this.loggedIn = true;
          this.user = userData;
          this.loaded = true;
        });
      } else {
        // store.dispatch("SIGNOUT");
        this.loggedIn = false;
        this.user = {};
        this.loaded = true;
      }
    });
    return h(App);
  },
}).$mount("#app");
