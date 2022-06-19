const { Class, Teacher } = require("../models/models");

const getClassesTeacher = (req, res) => {
  let id = req.params._id;
  Class.find({ teacherId: id }, (err, docs) => {
    err ? console.log(err) : res.status(200).json(docs);
    console.log(docs);
  });
};

module.exports = { getClassesTeacher };
