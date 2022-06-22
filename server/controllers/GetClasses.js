const { Class } = require("../models/models");

const getClassesTeacher = (req, res) => {
  let id = req.params._id;
  Class.find({ teacherId: id }, (err, docs) => {
    err
      ? res.status(500).json({ message: "Server side error occured" })
      : res.status(200).json(docs);
  });
};
const getClassesStudent = (req, res) => {
  let id = req.params._id;

  Class.find({ "roster._id": id }, (err, docs) => {
    err
      ? res.status(500).json({ message: "Server side error occured" })
      : res.status(200).json(docs);
  });
};

module.exports = { getClassesTeacher, getClassesStudent };
