const axios = require("axios").default;
const admin = require("firebase-admin");

require("dotenv").config();

const {
  GOOGLE_CREDENTIAL_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_DATABASE_URL,
} = process.env;

async function initializeApp() {
  if (admin.apps.length) return app;
  console.log("fecthing google service account credential...");
  const serviceAccount = (await axios.get(GOOGLE_CREDENTIAL_URL)).data;
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  });
}

module.exports = initializeApp();


