const list = require("../models/list");

async function tabledata(req, res, next) {
  let actualtableinc = parseInt(req.params.tableinc) + 1;
  const count = await list.countDocuments();
  try {
    if (req.params.tablestatcount == "init" || actualtableinc < 0) {
      const results = await list.find().limit(5);
      if (results) {
        res.locals.status = "success";
        res.locals.tablestatcount = "increment";
        res.locals.tablecount = count;
        res.locals.allresults = results;
        next();
      } else {
        res.locals.status = "no data";
        res.locals.tablestatcount = "";
        res.locals.tablecount = "";
        res.locals.allresults = "";
        next();
      }
    }
    if (
      actualtableinc >= 1 &&
      actualtableinc <= count &&
      req.params.tablestatcount == "increment"
    ) {
      const results = await list
        .find()
        .skip((actualtableinc - 1) * 5)
        .limit(5);
      if (results) {
        res.locals.status = "success";
        res.locals.tablestatcount = "increment";
        res.locals.tablecount = count;
        res.locals.allresults = results;
        next();
      } else {
        res.locals.status = "no data";
        res.locals.tablestatcount = "";
        res.locals.tablecount = "";
        res.locals.allresults = "";
        next();
      }
    }
    if (actualtableinc > 1 && req.params.tablestatcount == "decrement") {
      const results = await list
        .find()
        .skip((actualtableinc - 1) * 5 - 5)
        .limit(5);
      if (results) {
        res.locals.status = "success";
        res.locals.tablestatcount = "increment";
        res.locals.tablecount = count;
        res.locals.allresults = results;
        next();
      } else {
        res.locals.status = "no data";
        res.locals.tablestatcount = "";
        res.locals.tablecount = "";
        res.locals.allresults = "";
        next();
      }
    }
  } catch (err) {
    console.log(err);
    res.locals.status = "error";
    res.locals.tablestatcount = "";
    res.locals.tablecount = "";
    res.locals.allresults = "";
    next();
  }
}

module.exports = {
  tabledata: tabledata,
};
