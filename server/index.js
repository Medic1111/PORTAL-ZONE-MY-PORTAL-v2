const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const socketio = require("socket.io");

// ROUTES:

const {
  logInTeacherRoute,
  registerTeacherRoute,
} = require("./routes/AuthTeacher");
const {
  loginStudentRoute,
  registerStudentRoute,
} = require("./routes/AuthStudent");
const {
  newClassTeacherRouter,
  enrollInClassRouter,
} = require("./routes/NewClass");
const {
  getClassesTeacherRoute,
  getClassesStudentRoute,
} = require("./routes/GetClasses");
const { dropClass, deleteClass } = require("./routes/DropClass");
const addAssignment = require("./routes/AddAssignment");
const { Class } = require("./models/models");

const app = express();

// MIDDLEWARES

app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  session({
    secret: `${process.env.SECRET_STRING}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

// DATABASE

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("Connected to DB")
);

// ROUTE HANDLERS

app.use("/", logInTeacherRoute);
app.use("/", registerTeacherRoute);
app.use("/", loginStudentRoute);
app.use("/", registerStudentRoute);
app.use("/", newClassTeacherRouter);
app.use("/", enrollInClassRouter);
app.use("/", getClassesTeacherRoute);
app.use("/", getClassesStudentRoute);
app.use("/", addAssignment);
app.use("/", dropClass);
app.use("/", deleteClass);

// UNHANDLED ROUTES
app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

// SPIN SERVER
const server = app.listen(process.env.PORT || 3009, () =>
  console.log("Server Spinning")
);

// SOCKET SERVER:
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
