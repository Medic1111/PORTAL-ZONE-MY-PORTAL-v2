const bcrypt = require("bcrypt");
const { Teacher } = require("../models/models");
const saltRounds = 12;

const registerTeacher = async (req, res) => {
  const { fName, lName, email, password } = req.body;
  const hash = await bcrypt.hash(password, saltRounds);

  Teacher.find({ email: email }, async (err, doc) => {
    err &&
      res.status(500).json({ message: "Something went wrong on the server" });
    if (doc.length > 0) {
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

      await newTeacherInfo.save((err, doc) =>
        err
          ? res.status(500).json({ message: "Could not register the teacher" })
          : res.status(200).json(doc)
      );
    }
  });
};

// LOGIN

const loginTeacher = (req, res) => {
  const { email, password } = req.body;

  Teacher.find({ email: email }, (err, doc) => {
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

module.exports = { registerTeacher, loginTeacher };
