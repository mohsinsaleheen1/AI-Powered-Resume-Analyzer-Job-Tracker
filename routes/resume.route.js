const express = require("express");
const analyzeResumeController = require("../controllers/resume.Controller");
const router = express.Router();
router.post("/analyze", analyzeResumeController);
module.exports = router;
