const express = require("express");
const router = express.Router();
const guard = require("../src/guard");
const { autoRoute } = require("../src/router");
const { database } = require("firebase-admin");
const clientIp = require('../src/client-ip');

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
router.get("/status", async (req, res) => {
  const {
    rss,
    external,
    heapUsed,
    heapTotal,
  } = process.memoryUsage();
  const uptime = Math.round(process.uptime());
  const status = {
    uptime,
    memory: {
      rss,
      external,
      heapUsed,
      heapTotal,
    },
    count: req.count,
    ip: req.clientAddr,
  };
  if (
    process.env.NODE_ENV === 'production' && 
    typeof status.ip === 'string'
  ) {
    status.ipDetails = await clientIp(status.ip);
  }
  res.json(status);
})

//* 404 Not Found - fallback on no matched routes
router.use((req, res) => {
  res.status(404).json({ error: "request not found" });
});

module.exports = router;
