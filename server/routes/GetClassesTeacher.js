const express = require("express");
const router = express.Router();
const { getClassesTeacher } = require("../controllers/GetClassesTeacher");

router.get("/api/teacher/:_id/classes", getClassesTeacher);

module.exports = router;
