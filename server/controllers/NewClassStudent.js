const { Student, Teacher } = require("../models/models");

const enrollInClass = (req, res) => {
  const { secretKey, teacherEmail, user } = req.body;

  let classToEnroll;
  let mentor;
  let mentorEmail;

  Teacher.find({ email: teacherEmail }, (err, doc) => {
    if (err) {
      return res.status(500).json({ message: "Server error here" });
    } else {
      mentor = `${doc[0].fName} ${doc[0].lName}`;
      mentorEmail = doc[0].email;
    }

    classToEnroll = doc[0].classes.find((obj, index) => {
      return (classToEnroll = obj.secretKey === secretKey);
    });

    Student.findOneAndUpdate(
      { _id: user._id },
      {
        ...user,
        classes: [
          ...user.classes,
          {
            ...classToEnroll,
            mentor,
            mentorEmail,
          },
        ],
      },
      { new: true, returnOriginal: false },
      (err, docs) => {
        err
          ? res.status(500).json({ message: "Server Error" })
          : res.status(200).json(docs);
      }
    );
  });
};

module.exports = { enrollInClass };
