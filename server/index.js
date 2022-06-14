const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 12;
const path = require("path");
const exp = require("constants");
const { resolve } = require("path");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static(path.resolve(__dirname, "../client/build")));

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("Connected to DB")
);

// MAP OUT JSON FOR DB

app.get("/api/teacher/json", (req, res) => {
  console.log("get request in");
  res.json({
    name: "The mentor",
    credentials: { username: "teacher", password: "xxxx" },
    role: "teacher",
    classes: [
      {
        name: "math",
        key: "Secret",
        assignments: ["assignment one", "assignment two"],
        roster: [
          {
            student: {
              studentId: "yuhki",
              name: "student one",
              currentGrade: "a",
              pending: [],
              graded: [],
              messages: [],
            },
          },
        ],
      },
    ],
  });
});

app.get("/api/student/json", (req, res) => {
  console.log("get request in");
  res.json({
    name: "The student",

    credentials: {
      username: "student",
      password: "xxxx",
      studentId: "blahblah",
    },
    role: "student",
    classes: [
      {
        name: "math",
        key: "Secret",
        teacher: {
          name: "yuhki",
          email: "student@one.com",
          messages: [],
        },
      },
    ],
  });
});

app.post("/api/register/student", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "You reached the student route" });
});

app.post("/api/register/teacher", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "You reached the teacher route" });
});

app.get("*", (req, res) => {
  res.sendFile(
    express.static(resolve(__dirname, "../client/build", "index.html"))
  );
});

app.listen(process.env.PORT || 3009, () => console.log("Server Spinning"));
