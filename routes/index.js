const express = require("express");
const router = express.Router();
const serverStarted = Date.now();
const maxAge = 30 * 60 * 1000;
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
