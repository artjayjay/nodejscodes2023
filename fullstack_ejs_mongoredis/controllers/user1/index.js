var express = require("express");
var router = express.Router();

var dashboard = require("./dashboard");
var subscribe = require("./subscribe");

router.use("/dashboard", dashboard);
router.use("/subscribe", subscribe);

module.exports = router;
