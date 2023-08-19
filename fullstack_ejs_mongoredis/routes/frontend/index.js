require("dotenv").config();
var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  let nonce = res.locals.nonce;
  let sitekey = process.env.SITEKEY;
  res.render("authentication", { nonce: nonce, sitekey: sitekey });
});

router.get("/dashboard", (req, res) => {
  let nonce = res.locals.nonce;
  let sitekey = process.env.SITEKEY;
  res.render("dashboardpage", {
    nonce: nonce,
    sitekey: sitekey,
    name: req.session.lastname + " " + req.session.firstname,
  });
});

module.exports = router;
