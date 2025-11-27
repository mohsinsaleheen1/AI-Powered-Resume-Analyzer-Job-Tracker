const express = require("express");
const dashboard = require("../controllers/dashboard.con");
const router = express.Router();
router.get("/getdetails", dashboard);
module.exports = router;
