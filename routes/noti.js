const router = require("express").Router();
const guard = require("../src/guard");

router.get("/", guard.firebase("admin", "moderator"), (req, res) => {
  //
});

module.exports = router;
