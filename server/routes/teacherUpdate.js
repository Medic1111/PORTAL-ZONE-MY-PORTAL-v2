const express = require("express");
const router = express.Router();
const { updateTeacher } = require("../controllers/teacherUpdate");
router.post("/api/teacher/update", updateTeacher);

module.exports = router;
