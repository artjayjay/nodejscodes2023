let express = require("express");
let router = express.Router();

router.post("/", async (req, res) => {
  res.json({ status: "success" });
  res.end();
});

module.exports = router;
