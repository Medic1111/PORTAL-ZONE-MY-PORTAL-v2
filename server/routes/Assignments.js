const express = require("express");
const router = express.Router();
const {
  addAssignment,
  removeAssignment,
} = require("../controllers/Assignments");
const addAssign = router.post("/api/teacher/assignments/new", addAssignment);
const removeAssign = router.post(
  "/api/teacher/assignments/delete",
  removeAssignment
);
module.exports = { addAssign, removeAssign };