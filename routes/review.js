const { Router } = require("express");
const { database } = require("firebase-admin");
const Guard = require("../src/guard");
const router = Router();
const databaseName = process.env.FIREBASE_DATABASE_NAME;

router.get("/", Guard.firebase("admin", "moderator"), async (req, res) => {
  const dbRef = database().ref(`${databaseName}/reviews`);
  try {
    const results = [];
    const snapshot = await dbRef.get();
    if (!snapshot.exists()) {
      return res.json([]);
    }
    const data = snapshot.val();
    for (let [id, value] of Object.entries(data)) {
      value.id = id;
      results.push(value);
    }
    res.json(results.reverse()).end();
  } catch (e) {
    console.error(e);
    res.status(e.code || 500).end();
  }
});

router.post("/", Guard.firebase("admin", "moderator"), async (req, res) => {
  const dbRef = database().ref(`${databaseName}/reviews`);
  try {
    await dbRef.set(req.body);
    res.status(201).end();
  } catch (e) {
    console.error(e);
    res.status(e.code || 500).end();
  }
});

router.get("/:id", Guard.firebase("admin", "moderator"), async (req, res) => {
  const { id } = req.params;
  try {
    const dbRef = database().ref(`${databaseName}/reviews/${id}`);
    const snapshot = await dbRef.get();
    if (!snapshot.exists()) throw { code: 404 };
    res.status(200).json(snapshot.val());
  } catch (e) {
    console.error(e);
    res.status(e.code || 500).end();
  }
});

router.delete(
  "/:id",
  Guard.firebase("admin", "moderator"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const dbRef = database().ref(`${databaseName}/reviews/${id}`);
      const snapshot = await dbRef.get();
      if (!snapshot.exists()) throw { code: 404 };
      await dbRef.remove();
      res.status(200).end();
    } catch (e) {
      console.error(e);
      res.status(e.code || 500).end();
    }
  }
);

module.exports = router;
