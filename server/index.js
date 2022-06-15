const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const path = require("path");
const session = require("express-session");
require("dotenv").config();

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

// TEACHER SCHEMA

const teacherSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  role: String,
  classes: Array,
});

const Teacher = new mongoose.model("Teacher", teacherSchema);

// STUDENT SCHEMA

const studentSchema = new mongoose.Schema({
  fName: String,
  lName: String,
  email: String,
  password: String,
  role: String,
  classes: Array,
});

const Student = new mongoose.model("Student", studentSchema);

//
app.post("/api/register/student", async (req, res) => {
  const { fName, lName, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  const newStudentInfo = new Student({
    fName,
    lName,
    email,
    password: hash,
    role: "Student",
    classes: [],
  });

  newStudentInfo.save((err) =>
    err
      ? res.status(500).json({ message: "Could not register student" })
      : res.status(200).json({ message: "Successfully Registered Student" })
  );
});

app.post("/api/register/teacher", async (req, res) => {
  const { fName, lName, email, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  Teacher.find({ email: email }, (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong on the server" });
    } else if (doc.length > 0) {
      res.status(409).json({ message: "already registered" });
    } else {
      const newTeacherInfo = new Teacher({
        fName,
        lName,
        email,
        password: hash,
        role: "Mentor",
        classes: [],
      });

      newTeacherInfo.save((err, doc) =>
        err
          ? res.status(500).json({ message: "Could not register the teacher" })
          : res.status(200).json({ message: "Successfully Registered Teacher" })
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
