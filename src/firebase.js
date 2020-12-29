import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/performance";
import "firebase/storage";

export const databaseName = "ctkesqmPHGJHW95gMvnL";

export const app = firebase.initializeApp({
  appId: atob("MTo5NjYwNDA3NDU0NDI6d2ViOjJhODNjMDgyMTM3MjFjZGFhY2I1YmI="),
  apiKey: atob("QUl6YVN5QmlTa3hYX2dmbnF5aFBhdGgydkZ3bjJnakxjbHJGQ3RJ"),
  projectId: atob("ZXRoZXJpby12dWU="),
  authDomain: "etherio-vue.firebaseapp.com",
  storageBucket: "etherio-vue.appspot.com",
  databaseURL: "https://etherio-vue.firebaseio.com",
});

export const database = firebase.database().ref(databaseName);

export const storage = firebase.storage().ref(`databases/${databaseName}`);

export const firestore = firebase
  .firestore()
  .collection("public")
  .doc(databaseName);

export const auth = firebase.auth;
