const { database } = require("firebase-admin");
const express = require("express");
const router = express.Router();
const serverStarted = Date.now();
const guard = require("../src/guard");
const serverInfo = {
  requested: 0,
};
router.use((req, res, next) => {
  serverInfo.requested++;
  req.accessToken = req.headers["x-access-token"] || null;
  res.setHeader("cache-control", "no-cache");
  next();
});

router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/metadata", require("./metadata"));
router.use("/session", require("./session"));
router.use("/webhook", require("./webhook"));
router.use("/review", require("./review"));
router.use("/inventory", require("./stocks"));

router.post("/resync", guard.firebase("admin"), async (req, res) => {
  const db = database().ref(process.env.FIREBASE_DATABASE_NAME);
  const productsRef = db.child("products");
  const categoriesRef = db.child("categories");
  const inventoryRef = db.child("inventory");
  // get total ref
  const products = (await productsRef.get()).val() || {};
  const categories = (await categoriesRef.get()).val() || {};
  const inventory = (await inventoryRef.get()).val() || {};
  let stocks = 0;

  Object.values(inventory).forEach(({ count }) => {
    stocks += count;
  });

  await db.child("metadata/collection").set({
    products: Object.values(products).length,
    categories: Object.values(categories).length,
    inventory: stocks,
  });

  res.status(202).end();
});

router.all("/status", (req, res) => {
  const status = {
    started: serverStarted,
    requested: serverInfo.requested,
    timestamp: Date.now(),
  };
  if ("tz" in req.query) {
    const tz = req.query.tz || "UTC";
    status.started = new Date(status.started).toLocaleDateString(tz);
    status.expired = new Date(status.expired).toUTCString(tz);
    status.timestamp = new Date(status.timestamp).toUTCString(tz);
  }
  res.json(status);
});

router.use((req, res) => {
  res.status(404).json({ error: "request not found" });
});

module.exports = router;
