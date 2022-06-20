const { Class } = require("../models/models");
// NEED TO ADDRES NOT FOUND IN FRONT END
const getClassesStudent = (req, res) => {
  let id = req.params._id;

  Class.find({ "roster._id": id }, (err, docs) => {
    err
      ? res.status(500).json({ message: "Server side error occured" })
      : res.status(200).json(docs);
  });
};

module.exports = { getClassesStudent };
