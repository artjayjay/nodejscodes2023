require("dotenv").config();
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  let nonce = res.locals.nonce;
  let sitekey = process.env.SITEKEY;
  res.render("samplepage", { nonce: nonce, sitekey: sitekey });
});

module.exports = router;
