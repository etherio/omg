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

router.post("/", guard.firebase("admin"), async (req, res) => {
  try {
    const title = (req.body.title || '').trim().toLowerCase();
    if (!title) throw { code: 400, message: 'title required' };
    const id = crc32(title);
    const db = database().ref(`${databaseName}/categories`).child(id);
    const ref = await db.get();
    if (ref.exists()) throw { code: 200, message: 'already existed' };
    await db.set({ title, createdAt: database.ServerValue.TIMESTAMP });
    await database().ref(`${databaseName}/metadata/collection`)
      .update({ categories: database.ServerValue.increment(1) });
    res.json({ id, title });
  } catch(e) {
    res.status(e.code || 502).json({ status: e.code || 502, message: e.message });
  }
});

router.delete("/:id", guard.firebase("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const db = database().ref(`${databaseName}/categories`).child(id);
    const ref = await db.get();
    if (!ref.exists()) throw { code: 404, message: 'not found' };
    await db.remove();
    await database().ref(`${databaseName}/metadata/collection`)
      .update({ categories: database.ServerValue.increment(-1) });
    res.status(201).json({ id });
  } catch(e) {
    res.status(e.code || 502)
      .json({ status: e.code || 502, message: e.message });
  }
});

module.exports = router;
