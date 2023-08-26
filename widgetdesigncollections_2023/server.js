const express = require("express");
const { helmetconfig, nonceconfig } = require("./config/helmet");

const app = express();

app.use(helmetconfig());

app.use((req, res, next) => {
  res.locals.nonce = nonceconfig();
  next();
});

app.use(express.json());

const connectDB = require("./modulelibrary/mongodbconn");
connectDB();

var server = require("http").createServer(app);

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

app.set("view engine", "ejs");

let frontend = require("./routes/frontend");
let backend = require("./routes/backend");

app.use("/", frontend);
app.use("/api", backend);

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/vids", express.static(__dirname + "/public/vids"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/files", express.static(__dirname + "/public/files"));
