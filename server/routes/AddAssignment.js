const express = require("express");
const router = express.Router();
const { addAssignment } = require("../controllers/AddAssignment");
router.post("/api/teacher/assignments/new", addAssignment);

module.exports = router;
