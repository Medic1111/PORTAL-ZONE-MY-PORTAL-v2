const { Class } = require("../models/models");

const addAssignment = (req, res) => {
  const { assign, currentClass } = req.body;
  let updatedClass;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    err ? console.log(err) : await doc[0].assignments.push(assign);

    updatedClass = doc[0];
    Class.findOneAndUpdate(
      { _id: currentClass._id },
      updatedClass,
      { new: true, returnOriginal: false },
      (err, docs) => {
        err
          ? res.status(500).json({ message: "No go, try again" })
          : res.status(200).json(docs);
      }
    );
  });
};

const removeAssignment = (req, res) => {
  const { itemToDel, currentClass } = req.body;
  Class.find({ _id: currentClass._id }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      let updated = await doc[0].assignments.filter(
        (item) => item !== itemToDel
      );
      doc[0].assignments = updated;

      Class.findOneAndUpdate(
        { _id: currentClass._id },
        doc[0],
        { new: true, returnOriginal: false },
        (error, docs) => {
          error
            ? res.status(500).json({ message: "Server error" })
            : res.status(200).json(docs);
        }
      );
    }
  });
};

module.exports = { addAssignment, removeAssignment };
