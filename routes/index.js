const express = require("express");
const router = express.Router();
const guard = require("../src/guard");
const { autoRoute } = require("../src/router");
const { database } = require("firebase-admin");

autoRoute({
  routePath: __dirname,
  router,
  ignore: ["index.js"],
});

//* GET /resync 
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

//* GET /status 
router.get("/status", (req, res) => {
  const {
    heapTotal,
    heapUsed,
    rss,
    external,
    arrayBuffers,
  } = process.memoryUsage();
  const uptime = process.uptime();
  const timestamp = Date.now();
  const memUsed = heapUsed + external + arrayBuffers;
  const status = {
    memory: {
      allocated: `${(rss / 1024 / 1024).toFixed(2)}MB`,
      usage: `${(memUsed / 1024 / 1024).toFixed(2)}MB`,
    },
    started: Math.round(timestamp - uptime * 1000),
    timestamp,
    uptime: Math.round(uptime),
    requested: req.count,
  };
  console.log(req.headers)
  if ("tz" in req.query) {
    const locale = "en-US";
    const timeZone = req.query.tz || "UTC";
    status.started = new Date(status.started).toLocaleString(locale, {
      timeZone,
    });
    status.timestamp = new Date(status.timestamp).toLocaleString(locale, {
      timeZone,
    });
  }
  res.json(status);
})

//* 404 Not Found - fallback on no matched routes
router.use((req, res) => {
  res.status(404).json({ error: "request not found" });
});

module.exports = router;
