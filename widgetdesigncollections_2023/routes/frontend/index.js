require("dotenv").config();
let express = require("express");
let router = express.Router();

let { tabledata } = require("../../controllers/tabledata");

router.get("/", (req, res) => {
  let nonce = res.locals.nonce;
  let sitekey = process.env.SITEKEY;
  res.render("alldesignpage1", { nonce: nonce, sitekey: sitekey });
});

router.get(
  "/gettabledata/:tableinc/:tablestatcount/:type",
  tabledata,
  (req, res) => {
    let nonce = res.locals.nonce;
    let sitekey = process.env.SITEKEY;
    if (req.params.type === "table") {
      res.render("alldesignpage1/partials/table1.ejs", {
        nonce: nonce,
        sitekey: sitekey,
        allresults: res.locals.allresults,
      });
    }
    if (req.params.type === "data") {
      res.json({
        status: res.locals.status,
        tablestatcount: res.locals.tablestatcount,
        tablecount: res.locals.tablecount,
        allresults: res.locals.allresults,
      });
    }
  }
);

module.exports = router;
