const express = require("express");
const router = express.Router();
const { getClassesStudent } = require("../controllers/GetClassesStudent");

router.get("/api/student/:_id/classes", getClassesStudent);

module.exports = router;
