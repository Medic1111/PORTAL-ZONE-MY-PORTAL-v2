const express = require("express");
const router = express.Router();
const { getSpecClass } = require("../controllers/GetSpecClass");

router.get("/api/classes/:id", getSpecClass);

module.exports = router;
