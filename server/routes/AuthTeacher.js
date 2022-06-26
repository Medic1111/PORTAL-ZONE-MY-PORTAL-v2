const express = require("express");
const router = express.Router();
const { registerTeacher, loginTeacher } = require("../controllers/AuthTeacher");

// LOGIN
const logInTeacherRoute = router.get("/api/login/teacher", loginTeacher);

// REGISTER
const registerTeacherRoute = router.post(
  "/api/register/teacher",
  registerTeacher
);

module.exports = { logInTeacherRoute, registerTeacherRoute };
