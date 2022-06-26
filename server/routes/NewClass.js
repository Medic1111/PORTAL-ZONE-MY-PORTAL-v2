const express = require("express");
const router = express.Router();
const { newClassTeacher, enrollInClass } = require("../controllers/NewClass");

const newClassTeacherRouter = router.post(
  "/api/teacher/newclass",
  newClassTeacher
);

const enrollInClassRouter = router.put("/api/student/newclass", enrollInClass);

module.exports = { newClassTeacherRouter, enrollInClassRouter };
