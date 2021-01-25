const { database } = require('firebase-admin');
const crc32 = require('crc32');
const router = require('express').Router();
const guard = require('../src/guard');
const databaseName = process.env.FIREBASE_DATABASE_NAME;

router.get('/', guard.firebase('admin', 'moderator'), async (req, res) => {
  try {
    const categories = [];
    const db = database().ref(`${databaseName}/colors`);
    const ref = await db.get();
    if (ref.exists()) {
      Object.entries(ref.val())
	.forEach(([id, val]) => categories.push({ id, ...val }));
    }
    res.json(categories.reverse());
  } catch (e) {
    res.status(e.code || 502).json({
      status: e.code || 502,
      error: e.message,
    });
  }
});

router.post("/", guard.firebase("admin"), async (req, res) => {
  try {
    const title = (req.body.title || '').trim().toLowerCase();
    const code = req.body.code || undefined;
    if (!title) throw { code: 400, message: 'title required' };
    const id = crc32(title);
    const db = database().ref(`${databaseName}/colors`).child(id);
    const ref = await db.get();
    if (ref.exists()) throw { code: 200, message: 'already existed' };
    await db.set({ title, code, createdAt: database.ServerValue.TIMESTAMP });
    res.json({ id, title, code });
  } catch(e) {
    res.status(e.code || 502).json({ status: e.code || 502, message: e.message });
  }
});

router.post("/:id", guard.firebase("admin"), async (req, res) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    if (!code) throw { code: 400, message: 'required color code' };
    const db = database().ref(`${databaseName}/colors`).child(id);
    const ref = await db.get();
    if (!ref.exists()) throw { code: 404, message: 'not found' };
    await db.update({ code, updatedAt: database.ServerValue.TIMESTAMP });
    res.json({ id, code });
  } catch(e) {
    res.status(e.code || 502).json({ status: e.code || 502, message: e.message });
  }
});


router.delete('/:id', guard.firebase('admin', 'moderator'), async (req, res) => {
  try {
    const { id } = req.params;
    const db = database().ref(`${databaseName}/colors`).child(id);
    const ref = await db.get();
    if (!ref.exists()) throw { code: 404, message: 'not found' };
    await db.remove();
    res.status(201).json({ id });
  } catch (e) {
    res.status(e.code || 502)
      .json({  status: e.code || 502, error: e.message });
  }
});

module.exports = router;
