const { Router } = require("express");
const { database } = require("firebase-admin");
const router = Router();
const Guard = require("../src/guard");
const databaseName = process.env.FIREBASE_DATABASE_NAME;

router.get("/", Guard.firebase("admin", "moderator"), async (req, res) => {
  const response = { products: 0, categories: 0, inventory: 0 };
  const dbRef = database().ref(`${databaseName}/metadata`).child('collection');
  const snapshot = await dbRef.get();
  if (!snapshot.exists()) return res.json(response);
  const { categories, products, inventory } = snapshot.val();
  response.categories = categories || 0;
  response.products = products || 0;
  response.inventory = inventory || 0;
  res.json(response);
});

router.get("/combo", Guard.firebase("admin", "moderator"), async (req, res) => {
  const colorsRef = await database().ref(`${databaseName}/colors`).get();
  const categoriesRef = await database()
    .ref(`${databaseName}/categories`)
    .get();

  const colors = [];
  const categories = [];

  Object.entries(colorsRef.val() || {}).map(([id, data]) => {
    colors.push({ id, title: data.title });
  });

  Object.entries(categoriesRef.val() || {}).map(([id, data]) => {
    categories.push({ id, title: data.title });
  });

  res
    .json({ colors: colors.reverse(), categories: categories.reverse() })
    .end();
});

module.exports = router;
