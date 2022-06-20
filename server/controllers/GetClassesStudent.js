const { Class } = require("../models/models");
// NEED TO ADDRES NOT FOUND IN FRONT END
const getClassesStudent = (req, res) => {
  let id = req.params._id;

  Class.find({ "roster._id": id }, (err, docs) => {
    err ? console.log(err) : res.status(200).json(docs);
  });
};

module.exports = { getClassesStudent };
