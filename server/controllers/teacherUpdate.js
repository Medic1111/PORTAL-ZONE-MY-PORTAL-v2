const { Teacher } = require("../models/models");

const updateTeacher = (req, res) => {
  const user = req.body;

  Teacher.findOneAndUpdate(
    { email: user.email },
    user,
    { new: true, returnOriginal: false },
    (err, success) => {
      err ? res.status(400).json(err) : res.status(204).json(success);
    }
  );
};

module.exports = { updateTeacher };
