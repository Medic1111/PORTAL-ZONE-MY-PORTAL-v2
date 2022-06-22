const { Class } = require("../models/models");

const dropClassHandler = (req, res) => {
  const { currentClass, user } = req.body;

  Class.find({ _id: currentClass._id }, async (err, doc) => {
    if (err) {
      res.status(500).json({ message: "Server Error occured, try again" });
    } else {
      let update = await doc[0].roster.filter((obj) => {
        return obj._id !== user._id;
      });
      doc[0].roster = update;

      Class.findOneAndUpdate(
        { _id: currentClass._id },
        doc[0],
        { new: true, returnOriginal: false },
        (err, succ) => {
          err
            ? res
                .status(500)
                .json({ message: "Server Error occured, try again" })
            : res.status(200).json({ message: "Dropped out" });
        }
      );
    }
  });
};

const deleteClassHandler = (req, res) => {
  const id = req.body.currentClass._id;
  Class.findByIdAndDelete({ _id: id }, (err, succ) => {
    err
      ? res.status(500).json({ message: "Server Error occured, try again" })
      : res.status(200).json({ message: "Deleted" });
  });
};

module.exports = { dropClassHandler, deleteClassHandler };
