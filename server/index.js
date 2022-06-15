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

// REGISTER
app.post("/api/register/student", async (req, res) => {
  const { fName, lName, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  Student.find({ email: email }, (err, docs) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong on the server" });
    } else if (docs.length > 0) {
      res.status(409).json({ message: "already registered" });
    } else {
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
    }
  });
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

// LOGIN

app.post("/api/login/teacher", (req, res) => {
  const { email, password } = req.body;

  Teacher.find({ email: email }, (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server Error" });
    } else {
      if (doc.length > 0) {
        bcrypt.compare(password, doc[0].password, (error, match) => {
          if (error) {
            res.status(500).json({ message: "Server Error" });
          }
          if (match) {
            res.status(200).json(doc);
          } else if (!match) {
            res.status(401).json({ message: "Not authorized" });
          }
        });
      } else {
        res.status(404).json({ message: "User Not Registered" });
      }
    }
  });
});

app.post("/api/login/student", (req, res) => {
  const { email, password } = req.body;

  Student.find({ email: email }, (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server Error" });
    } else {
      if (doc.length > 0) {
        bcrypt.compare(password, doc[0].password, (error, match) => {
          if (error) {
            res.status(500).json({ message: "Server Error" });
          }
          if (match) {
            res.status(200).json(doc);
          } else if (!match) {
            res.status(401).json({ message: "Not authorized" });
          }
        });
      } else {
        res.status(404).json({ message: "User Not Registered" });
      }
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

app.listen(process.env.PORT || 3009, () => console.log("Server Spinning"));
