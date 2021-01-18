const router = require('express').Router();
const guard = require('../src/guard');
const { database } = require('firebase-admin');
const databaseName = process.env.FIREBASE_DATABASE_NAME;

router.get('/', guard.firebase('admin', 'moderator'), async (req, res) => {
  try {
    const dbRef = database().ref(`${databaseName}/inventory`);
    const snapshot = await dbRef.get();
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
});

router.get('/:id', guard.firebase('admin', 'moderator'), async (req, res) => {
  try {
    const { id } = req.params;
    const dbRef = database().ref(`${databaseName}/inventory`).child(id);
    const snapshot = await dbRef.get();
    if (!snapshot.exists()) return res.json({ count: 0 });
    const { count } = snapshot.val();
    res.json({ count });
  } catch (e) {
    console.error(e);
    res.status(e.code || 502).json({ error: e.message });
  }
});

router.post('/:id', guard.firebase('admin', 'moderator'), async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const dbRef = database().ref(`${databaseName}/inventory`).child(id);
    const val = (await dbRef.get()).val();
    await dbRef.update({
      count: database.ServerValue.increment(value),
    });
    await database().ref(`${databaseName}/metadata/collection`).update({
      inventory: database.ServerValue.increment(value),
    });
    res.status(201).json(val);
  } catch (e) {
    console.error(e);
    res.status(e.code || 502).json({ error: e.message });
  }
});


module.exports = router;
