const router = require("express").Router();
const guard = require("../src/guard");
const { database } = require("firebase-admin");
const databaseName = process.env.FIREBASE_DATABASE_NAME;

/* router.get("/", guard.firebase("admin", "moderator"), async (req, res) => {
  try {
    const db= database().ref(`${databaseName}/inventory_records`);
    if (!snapshot.exists()) return res.json([]);
    const results = [];
    for (let [id, value] of Object.entries(snapshot.val())) {
      results.push({ id, ...value });
    }
    res.json(results);
  } catch (e) {
    console.error(e);
    res.status(e.code || 502).json({
      error: e.message,
    });
  }
}); */

router.get("/:id", guard.firebase("admin", "moderator"), async (req, res) => {
  try {
    const { id } = req.params;
    const dbRef = database().ref(`${databaseName}/inventory_records`);
    const queued = dbRef.orderByKey().startAt(`${id}_`);
    const snapshot = await queued.get();
    if (!snapshot.exists()) return res.json([]);
    const records = [];
    Object.entries(snapshot.val()).forEach(([id, value]) =>
      records.push({ id, ...value })
    );
    res.json(records.reverse());
  } catch (e) {
    console.error(e);
    res.status(e.code || 502).json({ error: e.message });
  }
});

router.post("/:id", guard.firebase("admin", "moderator"), async (req, res) => {
  try {
    const { id } = req.params;
    const { value, description } = req.body;
    const inventoryRef = database().ref(`${databaseName}/inventory/${id}`);
    const recordsRef = database().ref(
      `${databaseName}/inventory_records/${id}_${Date.now()}`
    );
    const count = ((await inventoryRef.get()).val() || {}).count || 0;
    const record = {
      id,
      value,
      description,
      count,
      uid: req.auth.uid,
      createdAt: database.ServerValue.TIMESTAMP,
    };
    await recordsRef.set(record);
    await inventoryRef.update({
      count: database.ServerValue.increment(value),
    });
    await database()
      .ref(`${databaseName}/metadata/collection`)
      .update({
        inventory: database.ServerValue.increment(value),
      });
    record.createdAt = Date.now();
    res.status(201).json({ record, total: count + value });
  } catch (e) {
    console.error(e);
    res.status(e.code || 502).json({ error: e.message });
  }
});

module.exports = router;
