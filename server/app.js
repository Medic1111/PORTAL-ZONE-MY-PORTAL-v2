const app = require("./index");
const socketio = require("socket.io");
const { Class } = require("./models/models");

const server = app.listen(process.env.PORT || 3009, () =>
  console.log("Server Spinning")
);

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  // JOINING
  socket.on("join_room", (secretKey) => {
    socket.join(secretKey);
    console.log(socket.id, " has entered ", secretKey);
  });

  // MESSAGING
  socket.on("send_message", (data) => {
    console.log(data);

    // SENDING TO OTHER USERS IN SAME CHAT
    socket.to(data.secretKey).emit("receiving_msg", data);

    // SAVE IN DB
    Class.find({ secretKey: data.secretKey }, async (err, doc) => {
      err ? console.log(err) : await doc[0].messages.push(data);
      let upDoc = doc[0];
      Class.findOneAndUpdate(
        { secretKey: data.secretKey },
        upDoc,
        { new: true, returnOriginal: false },
        (error, success) => {
          error ? console.log(error) : console.log("Updated");
        }
      );
    });
  });

  // LEAVING ROOM
  socket.on("leave_chat", async (data) => {
    await socket.leave(data.secretKey);
    console.log("User has left room: ", data.secretKey);
  });

  // DISCONNECTING FROM SOCKET SERVER
  socket.on("disconnect", () => {
    console.log("User disconnected from socket server", socket.id);
  });
});
