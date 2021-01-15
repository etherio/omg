import { firebaseConfig } from "../../config";
import Vue from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import "firebase/performance";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

Vue.prototype.$auth = firebase.auth;

export default firebase;
