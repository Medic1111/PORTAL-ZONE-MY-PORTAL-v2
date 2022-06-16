const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
require("dotenv").config();
const {
  logInTeacherRoute,
  registerTeacherRoute,
} = require("./routes/AuthTeacher");
const {
  loginStudentRoute,
  registerStudentRoute,
} = require("./routes/AuthStudent");
const { Teacher } = require("./models/models");
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

app.post("/api/teacher/newclass", (req, res) => {
  const { user, className } = req.body;

  let secretKey = Math.floor(Math.random() * 10000);

  Teacher.findOneAndUpdate(
    { _id: user._id },
    {
      ...user,
      classes: [
        ...user.classes,
        {
          name: className,
          roster: [],
          assignments: [],
          secretKey: `${secretKey}${user.lName}`,
        },
      ],
    },
    { new: true, returnOriginal: false },
    (err, doc) => {
      err
        ? res.status(500).json({ message: "Server Error" })
        : res.status(200).json(doc);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(
    express.static(path.resolve(__dirname, "../client/build", "index.html"))
  );
});

app.listen(process.env.PORT || 3009, () => console.log("Server Spinning"));
