const { Class } = require("../models/models");

const enrollInClass = (req, res) => {
  const { secretKey, user } = req.body;

  Class.find({ secretKey: secretKey }, async (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      await doc[0].roster.push(user);
      let updatedDoc = doc[0];

      Class.findOneAndUpdate(
        { secretKey: secretKey },
        updatedDoc,
        { new: true, returnOriginal: false },
        (err, success) => {
          err ? console.log(err) : console.log(success);
        }
      );

      res.status(200).json(doc[0]);
    }
  });
};

module.exports = { enrollInClass };
