const { Class } = require("../models/models");

const addAssignment = (req, res) => {
  const { assign, currentClass } = req.body;
  let updatedClass;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      await doc[0].assignments.push(assign);
      updatedClass = doc[0];

      Class.findOneAndUpdate(
        { _id: currentClass._id },
        updatedClass,
        { new: true, returnOriginal: false },
        (err, docs) => {
          if (err) {
            res.status(500).json({ message: "No go, try again" });
          } else {
            res.status(200).json(docs);
          }
        }
      );
    }
  });
};

module.exports = { addAssignment };
