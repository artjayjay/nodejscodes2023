var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const auth = require("../modulelibrary/authsession");
const { loginvalidation } = require("./inputvalidation");
const { userauth } = require("./userauth");
const autologout = require("./autologout");

/////////////////////// for login page /////////////////////
router.use(auth, loginvalidation, userauth, async (req, res, next) => {
  if (res.locals.status == "loggedout") {
    const { password } = req.body;
    var results = res.locals.results;
    if (
      results &&
      results != "none" &&
      (await bcrypt.compare(password, results.password))
    ) {
      req.session.authenticated = true;
      req.session.userid = results.id;
      req.session.lastname = results.lastname;
      req.session.firstname = results.firstname;
      res.locals.status = "success";
      next();
    } else {
      res.locals.status = "invalid";
      next();
    }
  } else {
    res.locals.status == "invalid";
  }
});

router.use(autologout);

router.post("/", (req, res) => {
  if (res.locals.status == "success") {
    console.log("Success Login");
    res.json({ status: "success" });
  } else {
    res.json({ status: "invalid" });
  }
});
//////////////////////////////////////////////////////////////

module.exports = router;
