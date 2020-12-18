import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const DATABASE_NAME = "Y3RrZXNxbVBIR0pIVzk1Z012bkw=";

export const app = firebase.initializeApp({
  appId: atob("MTo5NjYwNDA3NDU0NDI6d2ViOjJhODNjMDgyMTM3MjFjZGFhY2I1YmI="),
  apiKey: atob("QUl6YVN5QmlTa3hYX2dmbnF5aFBhdGgydkZ3bjJnakxjbHJGQ3RJ"),
  projectId: atob("ZXRoZXJpby12dWU="),
  authDomain: "etherio-vue.firebaseapp.com",
  storageBucket: "etherio-vue.appspot.com",
  databaseURL: "https://etherio-vue.firebaseio.com",
});

export const storage = firebase
  .storage()
  .ref(`databases/${atob(DATABASE_NAME)}`);

export const firestore = firebase
  .firestore()
  .collection("public")
  .doc(atob(DATABASE_NAME));

export const auth = firebase.auth;
