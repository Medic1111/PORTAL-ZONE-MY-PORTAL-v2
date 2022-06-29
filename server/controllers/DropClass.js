const { Class } = require("../models/models");

const dropClassHandler = (req, res) => {
  const { classId, userId } = req.body;
  Class.find({ _id: classId }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server Error occured, try again" });
    } else {
      if (doc.length > 0) {
        let update = await doc[0].roster.filter((obj) => obj._id !== userId);
        doc[0].roster = update;
        doc[0].save((err, doc) => {
          err
            ? res
                .status(500)
                .json({ message: "Server Error occured, try again" })
            : res.status(200).json({ message: "Dropped out" });
        });
      } else {
        res.status(404).json({ msg: "Class no longer exists" });
      }
    }
  });
};

const deleteClassHandler = (req, res) => {
  const { classId } = req.body;
  Class.findByIdAndDelete({ _id: classId }, (err, succ) => {
    err
      ? res.status(500).json({ message: "Server Error occured, try again" })
      : res.status(200).json({ message: "Deleted" });
  });
};

module.exports = { dropClassHandler, deleteClassHandler };
