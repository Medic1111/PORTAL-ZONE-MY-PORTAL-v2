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
const addNewClassRouter = require("./routes/NewClassTeacher");
const enrollInClassRouter = require("./routes/NewClassStudent");
const getAllClassesTeacherRoute = require("./routes/GetClassesTeacher");
const getAllClassesStudentRoute = require("./routes/GetClassesStudent");
const { Class } = require("./models/models");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  session({
    secret: `${process.env.SECRET_STRING}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("Connected to DB")
);

app.use("/", logInTeacherRoute);
app.use("/", registerTeacherRoute);
app.use("/", loginStudentRoute);
app.use("/", registerStudentRoute);
app.use("/", addNewClassRouter);
app.use("/", enrollInClassRouter);
app.use("/", getAllClassesTeacherRoute);
app.use("/", getAllClassesStudentRoute);

// ADD assignment

app.post("/api/teacher/assignments/new", (req, res) => {
  const { assign, currentClass } = req.body;
  let updatedClass;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      await doc[0].assignments.push(assign);
      updatedClass = doc[0];

      Class.findOneAndUpdate(
        { _id: currentClass._id },
        updatedClass,
        { new: true, returnOriginal: false },
        (err, docs) => {
          if (err) {
            res.status(500).json({ message: "No go, try again" });
          } else {
            res.status(200).json(docs);
          }
        }
      );
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

app.listen(process.env.PORT || 3009, () => console.log("Server Spinning"));
