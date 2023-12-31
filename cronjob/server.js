const express = require("express");
const app = express();
const port = 3000;

const schedule = require("node-schedule");
var mjob;
app.get("/schedule/:name", (req, res) => {
  //var date = new Date(2022, 09, 30, 23, 43, 20);
  var date = new Date(Date.now() + 10000);
  mjob = schedule.scheduleJob(req.params.name, date, () => {
    console.log("test cronjob...");
    mjob.cancel(req.params.name);
  });
  res.send("schedule");
});

// mjob.cancel("myname"); to cancel the schedule

app.get("/getallrunningjobs/:name", (req, res) => {
  if (schedule.scheduledJobs[req.params.name]) {
    console.log("true");
    // if invalid like behind current time
    // mjob.cancel("myname");
  } else {
    console.log("false");
  }

  res.send("getting jobs");
});

app.get("/stoprunningjobs/:name", (req, res) => {
  mjob.cancel(req.params.name);
  res.send("running jobs stopped");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/// strategy
/// when the user connects online it checks from database if scheduled
/// it will add additional condition if the schedule is not valid
/// or the schedule is behind the current time
/// it will cancel the cronjob
///
/// if yes the cronjob will trigger
/// to prevent duplication it will check if already exist
