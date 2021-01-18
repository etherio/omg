const axios = require("axios").default;
const admin = require("firebase-admin");

let app;

require("dotenv").config();

const {
  GOOGLE_CREDENTIAL_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_DATABASE_URL,
} = process.env;

async function initializeApp() {
  if (app) return app;
  console.log("fecthing google service account credential...");
  const serviceAccount = (await axios.get(GOOGLE_CREDENTIAL_URL)).data;
  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  });
  return app;
}

module.exports = initializeApp;
