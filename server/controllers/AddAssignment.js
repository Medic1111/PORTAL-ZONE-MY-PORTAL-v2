// RECEIVES ASSIGNMENT AND REFERENCE
// FOR CURRENT CLASS
// FIND THE CLASS IN DB, ALTERS THE ASSIGNMENT
// BY PUSHING, STORES IT IN NEW VAR
// UPDATES WITH NEW DOC

const { Class } = require("../models/models");

const addAssignment = (req, res) => {
  const { assign, currentClass } = req.body;
  let updatedClass;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    err ? console.log(err) : await doc[0].assignments.push(assign);

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

module.exports = { addAssignment };
