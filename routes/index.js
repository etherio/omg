const axios = require("axios").default;
const express = require("express");
const router = express.Router();
const serverStarted = Date.now();
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

router.post("/cors", (req, res) => {
  let { url } = req.body;
  axios
    .get(url)
    .then((response) => {
      Object.entries(response.headers).forEach(([key, value]) =>
        res.setHeader(key, value)
      );
      res.status(response.status).send(response.data).end();
    })
    .catch((err) => res.status(err.code || 400).json({ error: err.message }));
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
