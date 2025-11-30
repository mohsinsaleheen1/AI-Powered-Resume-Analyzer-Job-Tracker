const express = require("express");
const {
  addJob,
  allJob,
  updateJob,
  deleteJob,
  singleJob,
} = require("../controllers/job.con");
const router = express.Router();
router.post("/addJob", addJob);
router.get("/allJob", allJob);
router.get("/singleJob/:id", singleJob);
router.put("/updateJob/:id", updateJob);
router.delete("/deleteJob/:id", deleteJob);
module.exports = router;
