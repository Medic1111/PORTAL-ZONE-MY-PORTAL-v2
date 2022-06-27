const { Class } = require("../models/models");

const newClassTeacher = async (req, res) => {
  const { user, className, teacherId } = req.body;
  let secretKey = Math.floor(Math.random() * 10000);

  const newClass = new Class({
    className,
    secretKey: `${secretKey}${user.lName}`,
    teacherId,
    assignments: [],
    whoTeach: { email: user.email, fName: user.fName, lName: user.lName },
    roster: [],
    messages: [],
  });

  await newClass.save((err, doc) => {
    err
      ? res.status(500).json({ message: "Something went wrong" })
      : res.status(200).json({
          assignments: doc.assignments,
          className: doc.className,
          messages: doc.messages,
          whoTeach: doc.whoTeach,
          _id: doc._id,
          roster: doc.roster,
        });
  });
};

const enrollInClass = (req, res) => {
  const { secretKey, user } = req.body;

  Class.find({ secretKey: secretKey }, async (err, doc) => {
    err && res.status(500).json({ message: "Server side err occured" });

    if (doc.length !== 0) {
      await doc[0].roster.push({
        email: user.email,
        fName: user.fName,
        lName: user.lName,
        _id: user._id,
      });

      doc[0].save((err, docs) => {
        err
          ? res.status(500).json({ message: "Server side err occured" })
          : res.status(200).json({
              assignments: doc[0].assignments,
              className: doc[0].className,
              messages: doc[0].messages,
              whoTeach: doc[0].whoTeach,
              _id: doc[0]._id,
            });
      });
    } else {
      res.status(404).json({ message: "No class found with that key" });
    }
  });
};

module.exports = { newClassTeacher, enrollInClass };
