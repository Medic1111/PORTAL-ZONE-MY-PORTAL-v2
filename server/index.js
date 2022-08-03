const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
require("dotenv").config();

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
const { addAssign, removeAssign } = require("./routes/Assignments");
const getSpecClasRoute = require("./routes/GetSpecClass");

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
app.use("/", addAssign);
app.use("/", removeAssign);
app.use("/", dropClass);
app.use("/", deleteClass);
app.use("/", getSpecClasRoute);

// UNHANDLED ROUTES
app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

// SPIN SERVER
// const server = app.listen(process.env.PORT || 3009, () =>
//   console.log("Server Spinning")
// );

module.exports = app;
