const router = require("express").Router();
const guard = require("../src/guard");
const crc32 = require("crc32");
const { database } = require("firebase-admin");
const databaseName = process.env.FIREBASE_DATABASE_NAME;

router.get("/", guard.firebase("admin", "moderator"), async (req, res) => {
  const dbRef = database().ref(`${databaseName}/categories`);
  const ref = await dbRef.get();
  const response = [];
  Object.entries(ref.val() || {}).forEach(
    ([id, data]) => response.push({ id, ...data })
  );
  res.json(response.reverse());
});

router.post("/", guard.firebase("admin", "moderator"), async (req, res) => {
  const dbRef = database().ref(`${databaseName}/categories`);
  const ref = await dbRef.get();
  const response = [];
  Object.entries(ref.val() || {}).forEach(
    ([id, data]) => response.push({ id, ...data })
  );
  res.json(response.reverse());
});

module.exports = router;
