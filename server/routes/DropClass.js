const express = require("express");
const router = express.Router();
const {
  dropClassHandler,
  deleteClassHandler,
} = require("../controllers/DropClass");
// STUDENT DROP CLASS
const dropClass = router.put("/api/student/classes/delete", dropClassHandler);

// TEST: TEACHER DELETE CLASS
const deleteClass = router.delete(
  "/api/teacher/classes/delete",
  deleteClassHandler
);

module.exports = { dropClass, deleteClass };
