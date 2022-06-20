const bcrypt = require("bcrypt");
const { Student } = require("../models/models");
const saltRounds = 12;

// LOGIN
const loginStudent = (req, res) => {
  const { email, password } = req.body;

  Student.find({ email: email }, (err, doc) => {
    err && res.status(500).json({ message: "Server Error" });
    if (doc.length > 0) {
      bcrypt.compare(password, doc[0].password, (error, match) => {
        error && res.status(500).json({ message: "Server Error" });
        match
          ? res.status(200).json(doc)
          : res.status(401).json({ message: "Not authorized" });
      });
    } else {
      res.status(404).json({ message: "User Not Registered" });
    }
  });
};

//REGISTER

const registerStudent = async (req, res) => {
  const { fName, lName, email, password } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);

  Student.find({ email: email }, async (err, docs) => {
    err &&
      res.status(500).json({ message: "Something went wrong on the server" });
    if (docs.length > 0) {
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
      await newStudentInfo.save((err, docs) =>
        err
          ? res.status(500).json({ message: "Could not register student" })
          : res.status(200).json(docs)
      );
    }
  });
};

module.exports = { loginStudent, registerStudent };
