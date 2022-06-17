const { Teacher, Class } = require("../models/models");

const newClassTeacher = (req, res) => {
  const { user, className, teacherId } = req.body;

  let secretKey = Math.floor(Math.random() * 10000);

  // CLASSES:

  const newClass = new Class({
    className,
    secretKey: `${secretKey}${user.lName}`,
    teacherId,
    assignments: [],
    whoTeach: user,
    roster: [],
  });

  newClass.save((err, doc) => {
    err
      ? res.status(500).json({ message: "Something went wrong" })
      : res.status(200).json(doc);
  });
};

module.exports = { newClassTeacher };
