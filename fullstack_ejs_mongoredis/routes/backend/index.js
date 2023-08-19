let express = require("express");
let router = express.Router();

let login = require("../../controllers/login");
let logout = require("../../controllers/logout");
let register = require("../../controllers/register");
let user1 = require("../../controllers/user1");

router.use("/login", login);
router.use("/logout", logout);
router.use("/register", register);

router.use("/user1", user1);

module.exports = router;
