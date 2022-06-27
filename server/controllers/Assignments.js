const { Class } = require("../models/models");

const addAssignment = (req, res) => {
  const { assign, currentClass } = req.body.data;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    err ? console.log(err) : await doc[0].assignments.push(assign);
    doc[0].save((err, doc) => {
      err
        ? res.status(500).json({ message: "No go, try again" })
        : res.status(200).json({ message: "New assignment added" });
    });
  });
};

const removeAssignment = (req, res) => {
  const { itemToDel, id } = req.body;
  Class.find({ _id: id }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server error" });
    } else {
      let updated = await doc[0].assignments.filter(
        (item) => item !== itemToDel
      );
      doc[0].assignments = updated;
      doc[0].save((error, docs) => {
        error
          ? res.status(500).json({ message: "Server error" })
          : res.status(200).json(docs);
      });
    }
  });
};

module.exports = { addAssignment, removeAssignment };
