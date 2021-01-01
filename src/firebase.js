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
  apiKey: "AIzaSyBgkNJBP6moWUoBEuOjBd2Yg1EuKsPHx1Q",
  authDomain: "omg-baby.firebaseapp.com",
  databaseURL: "https://omg-baby-default-rtdb.firebaseio.com",
  projectId: "omg-baby",
  storageBucket: "omg-baby.appspot.com",
  messagingSenderId: "499374745893",
  appId: "1:499374745893:web:ae59292b3d99c41b7e12cc",
  measurementId: "G-VEF70B6QLW",
});

export const auth = firebase.auth;

export const database = firebase.database().ref(databaseName);

export const firestore = firebase
  .firestore()
  .collection("public")
  .doc(databaseName);

export const storage = firebase.storage().ref(`databases/${databaseName}`);

export const messaging = firebase.messaging;
