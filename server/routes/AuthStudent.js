const express = require("express");
const router = express.Router();
const { loginStudent, registerStudent } = require("../controllers/AuthStudent");

// REGISTER
router.post("/api/register/student", registerStudent);

// LOGIN
router.post("/api/login/student", loginStudent);

module.exports = router;
