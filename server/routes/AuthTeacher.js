const express = require("express");
const router = express.Router();
const { registerTeacher, loginTeacher } = require("../controllers/AuthTeacher");

// LOGIN
router.post("/api/login/teacher", loginTeacher);

// REGISTER
router.post("/api/register/teacher", registerTeacher);

module.exports = router;
