const { Class } = require("../models/models");

const newClassTeacher = async (req, res) => {
  const { user, className, teacherId } = req.body;
  let secretKey = Math.floor(Math.random() * 10000);

  const newClass = new Class({
    className,
    secretKey: `${secretKey}${user.lName}`,
    teacherId,
    assignments: [],
    whoTeach: user,
    roster: [],
    messages: [],
  });

  await newClass.save((err, doc) => {
    err
      ? res.status(500).json({ message: "Something went wrong" })
      : res.status(200).json(doc);
  });
};

const enrollInClass = (req, res) => {
  const { secretKey, user } = req.body;

  Class.find({ secretKey: secretKey }, async (err, doc) => {
    err && res.status(500).json({ message: "Server side err occured" });

    if (doc.length !== 0) {
      await doc[0].roster.push(user);
      let updatedDoc = doc[0];

      Class.findOneAndUpdate(
        { secretKey: secretKey },
        updatedDoc,
        { new: true, returnOriginal: false },
        (err, success) => {
          err
            ? res.status(500).json({ message: "Server side err occured" })
            : res.status(200).json(doc[0]);
        }
      );
    } else {
      res.status(404).json({ message: "No class found with that key" });
    }
  });
};

module.exports = { newClassTeacher, enrollInClass };
