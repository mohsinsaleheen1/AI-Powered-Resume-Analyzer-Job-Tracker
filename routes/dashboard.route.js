const express = require("express");
const dashboard = require("../controllers/dashboard.con");
const upload = require("../config/multerconfig");
const router = express.Router();
router.get("/getdetails", dashboard);
router.post("/upload", upload.single("resume"), (req, res) => {
  res.send({
    status: "success",
    file: req.file,
  });
});
module.exports = router;
