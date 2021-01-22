import Vue from "vue";
import { firebaseConfig } from "@/../config/index";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

if (process.env.NODE_ENV === "production") {
  firebase.analytics();
  firebase.performance();
}

Vue.prototype.$auth = () => firebase.auth().currentUser;

export default firebase;
