const express = require("express");
const router = express.Router();
const { newClassTeacher } = require("../controllers/NewClassTeacher");

router.post("/api/teacher/newclass", newClassTeacher);

module.exports = router;
