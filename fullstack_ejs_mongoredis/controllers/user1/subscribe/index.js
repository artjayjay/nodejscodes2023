var express = require("express");
var router = express.Router();

const client = require("../../../modulelibrary/importredisio");

router.post("/subscribe", async (req, res) => {
  const { strsubscription } = req.body;

  client.hmset(req.session.userid + "-notif", {
    strsubscription: strsubscription,
  });

  console.log(strsubscription);
  res.json({ status: "success" });
});

module.exports = router;
