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

app.get("/api", (req, res) => {
  console.log("get request in");
  res.json({ message: "Server here" });
});

app.get("*", (req, res) => {
  res.sendFile(
    express.static(resolve(__dirname, "../client/build", "index.html"))
  );
});

app.listen(process.env.PORT || 3009, () => console.log("Server Spinning"));
