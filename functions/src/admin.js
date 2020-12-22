const fetch = require("node-fetch");
const admin = require("firebase-admin");

let app;

require("dotenv").config();

module.exports = {
  async init() {
    const credentialUrl = `${process.env.GOOGLE_CLOUD_CREDENTIAL}&token=${process.env.FIREBASE_STORAGE_TOKEN}`;
    const response = await fetch(credentialUrl);
    const serviceAccount = await response.json();
    if (app) return app;
    return (app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    }));
  },
};
