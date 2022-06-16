const express = require("express");
const router = express.Router();
const { enrollInClass } = require("../controllers/NewClassStudent");

router.post("/api/student/newclass", enrollInClass);

module.exports = router;
