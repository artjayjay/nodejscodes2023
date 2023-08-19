const express = require("express");
const { helmetconfig, nonceconfig } = require("./config/helmet");
const { getfilespath } = require("./config/filepath");

const app = express();

app.use(helmetconfig());

app.use((req, res, next) => {
  res.locals.nonce = nonceconfig();
  next();
});

app.use(express.json());

const connectDB = require("./modulelibrary/mongodbconn");
connectDB();

let sessionMiddleware = require("./modulelibrary/sessionconfig");
app.use(sessionMiddleware);

let server = require("http").createServer(app);

const io = require("socket.io")(server, { cors: { origin: "*" } });

const port = 3000;

server.listen(port, (err) => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Listening on port...${port}`);
});

///////////// to wrap express session auth inside socket //////////
const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));
//////////////////////////////////////////////////////////////////

////////////////// use for realtime connection ////////////////////
let { iofunc } = require("./socketauth/ioinside.js");
iofunc(io);
let { socketfunct } = require("./extrasocket/socketinside.js");
///////////////////////////////////////////////////////////////////

/////////////////// socket connection instance /////////////////
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  socketfunct(socket);
  app.socket = socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    socket.disconnect(true);
  });
});
////////////////////////////////////////////////////////////////

app.set("view engine", "ejs");

let frontend = require("./routes/frontend");
let backend = require("./routes/backend");

app.use("/", frontend);
app.use("/api", getfilespath, backend);

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/img", express.static(__dirname + "/public/img"));
app.use("/vids", express.static(__dirname + "/public/vids"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/files", express.static(__dirname + "/public/files"));
