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
const addNewClassRouter = require("./routes/NewClassTeacher");
const enrollInClassRouter = require("./routes/NewClassStudent");
const getAllClassesTeacherRoute = require("./routes/GetClassesTeacher");
const getAllClassesStudentRoute = require("./routes/GetClassesStudent");
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
app.use("/", addNewClassRouter);
app.use("/", enrollInClassRouter);
app.use("/", getAllClassesTeacherRoute);
app.use("/", getAllClassesStudentRoute);
app.use("/", addAssignment);

// TEST: TEACHER DELETE CLASS
app.delete("/api/teacher/classes/delete", (req, res) => {
  const id = req.body.currentClass._id;
  Class.findByIdAndDelete({ _id: id }, (err, succ) => {
    err
      ? res.status(500).json({ message: "Server Error occured, try again" })
      : res.status(200).json({ message: "Deleted" });
  });
});

app.put("/api/student/classes/delete", (req, res) => {
  const { currentClass, user } = req.body;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server Error occured, try again" });
    } else {
      let update = await doc[0].roster.filter((obj) => {
        return obj._id !== user._id;
      });
      doc[0].roster = update;

      Class.findOneAndUpdate(
        { _id: currentClass._id },
        doc[0],
        { new: true, returnOriginal: false },
        (err, succ) => {
          err
            ? res
                .status(500)
                .json({ message: "Server Error occured, try again" })
            : res.status(200).json({ message: "Dropped out" });
        }
      );
    }
  });
});

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
