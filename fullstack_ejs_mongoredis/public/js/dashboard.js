//////////////// for socket connection /////////////////
const socket = io();

socket.on("connect", () => {
  alert("connected to realtime");
});

socket.on("chat-message", (msg) => {
  console.log(msg);
});

socket.on("clientmessagerecieve", (msg) => {
  console.log(msg.message);
});

document.getElementById("sendsocketid").addEventListener("click", () => {
  socket.emit("message", {
    message: "this is from client socket",
  });
});

////////////////////////////////////////////////////////
