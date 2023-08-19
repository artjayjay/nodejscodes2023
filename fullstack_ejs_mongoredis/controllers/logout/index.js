let express = require("express");
let router = express.Router();

let auth = require("../modulelibrary/authsession");
const client = require("../../modulelibrary/importredisio");

router.get("/", auth, (req, res) => {
  console.log("User Logged Out");
  client.del(req.session.userid);
  req.session.destroy();
  res.clearCookie("sessid");
  res.json({ status: "success" });
});

module.exports = router;
