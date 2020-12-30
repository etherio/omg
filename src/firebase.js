import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/messaging";
import "firebase/performance";
import "firebase/storage";

export const databaseName = "ctkesqmPHGJHW95gMvnL";

export const app = firebase.initializeApp({
  appId: "1:966040745442:web:2a83c08213721cdaacb5bb",
  apiKey: "AIzaSyBiSkxX_gfnqyhPath2vFwn2gjLclrFCtI",
  projectId: "etherio-vue",
  authDomain: "etherio-vue.firebaseapp.com",
  storageBucket: "etherio-vue.appspot.com",
  databaseURL: "https://etherio-vue.firebaseio.com",
  messagingSenderId: "966040745442",
});

export const auth = firebase.auth;

export const database = firebase.database().ref(databaseName);

export const firestore = firebase
  .firestore()
  .collection("public")
  .doc(databaseName);

export const storage = firebase.storage().ref(`databases/${databaseName}`);

export const messaging = firebase.messaging;
