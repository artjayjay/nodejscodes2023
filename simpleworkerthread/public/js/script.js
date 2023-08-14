const socket = io();

socket.on("connect", () => {
  sendrealtime();
});

function sendrealtime() {
  socket.emit("socketmsg", "test worker threads message");
}
