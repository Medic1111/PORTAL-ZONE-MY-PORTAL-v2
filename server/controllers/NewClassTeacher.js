const { Teacher, Class } = require("../models/models");

const newClassTeacher = (req, res) => {
  const { user, className, teacherId } = req.body;

  let secretKey = Math.floor(Math.random() * 10000);

  // Teacher.findOneAndUpdate(
  //   { _id: user._id },
  //   {
  //     ...user,
  //     classes: [
  //       ...user.classes,
  //       {
  //         name: className,
  //         roster: [],
  //         assignments: [],
  //         secretKey: `${secretKey}${user.lName}`,
  //       },
  //     ],
  //   },
  //   { new: true, returnOriginal: false },
  //   (err, doc) => {
  //     err
  //       ? res.status(500).json({ message: "Server Error" })
  //       : res.status(200).json(doc);
  //   }
  // );

  // CLASSES:

  const newClass = new Class({
    className,
    secretKey,
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
