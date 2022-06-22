const express = require("express");
const router = express.Router();
const {
  getClassesTeacher,
  getClassesStudent,
} = require("../controllers/GetClasses");

const getClassesTeacherRoute = router.get(
  "/api/teacher/:_id/classes",
  getClassesTeacher
);

const getClassesStudentRoute = router.get(
  "/api/student/:_id/classes",
  getClassesStudent
);

module.exports = { getClassesTeacherRoute, getClassesStudentRoute };
