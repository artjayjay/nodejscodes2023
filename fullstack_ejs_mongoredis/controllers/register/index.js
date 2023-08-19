var express = require("express");
var router = express.Router();

var uniqid = require("uniqid");

const bcrypt = require("bcrypt");

const { registervalidation, ifexist } = require("./inputvalidation");
const { userregisterauth, userregisterinsert } = require("./userregister");

router.use(registervalidation);
router.use(userregisterauth);
router.use(ifexist);

router.post("/", async (req, res) => {
  let user = req.body.username;
  const hashedpassword = await bcrypt.hash(req.body.password, 10);
  let pass = hashedpassword;
  let last = req.body.lastname;
  let first = req.body.firstname;

  let post = {
    id: uniqid(),
    username: user,
    password: pass,
    lastname: last,
    firstname: first,
  };
  userregisterinsert(post);
  res.json({ status: "success" });
});

module.exports = router;
