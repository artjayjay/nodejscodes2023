let express = require("express");
let router = express.Router();

let auth = require("../../modulelibrary/authsession");

const fs = require("fs");

router.use(auth);

/////////////////////// for dashboard page ///////////////////
router.get("/dashboard", async (req, res) => {
  try {
    console.log(
      "Connected: " + req.app.socket.id + " node1 \nmy ip is " + req.ip
    );
    req.app.socket.emit(
      "chat-message",
      "from server" + " node1 \nmy ip is " + req.ip
    );
    res.json({
      status: "loggedin",
      name: req.session.lastname + " " + req.session.firstname,
    });
  } catch (error) {
    res.json({ status: "invalid" });
  }
});
///////////////////////////////////////////////////////////////

router.post("/fileupload", (req, res) => {
  if (user[req.body.filename]) {
  } else {
    user[req.body.filename] = 0;
  }
  user[req.body.filename] += 1;
  if (req.files && user[req.body.filename] != 2) {
    console.log(req.body.filename);
    console.log(req.files.filedata.name);
    let filedata = req.files.filedata;
    let filename = req.body.filename;
    let mimetype = req.files.filedata.mimetype;
    if (mimetype == "image/png") {
      mimetype = ".png";
    }
    filedata.mv("./uploads/" + filename + mimetype, (err) => {
      if (err) {
        res.json({ status: "error" });
      } else {
        res.json({ status: "success" });
      }
    });
  } else {
    console.log(req.files.filedata.tempFilePath);
    fs.unlink(req.files.filedata.tempFilePath, (err) => {
      if (err) {
        throw err;
      }

      console.log("Delete File successfully.");
    });
    res.json({ status: "invalid" });
  }
});

module.exports = router;
