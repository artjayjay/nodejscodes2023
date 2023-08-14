let express = require("express");
let router = express.Router();

let sample = require("../../controllers");

router.use("/sample", sample);

module.exports = router;
