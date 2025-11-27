const jwt = require("jsonwebtoken");
const user = require("../models/user.model.js");
const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != "undefined") {
      const token = bearerHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      res.token = user;
      next();
    } else {
      res.status(401).json({ message: "No Token provided" });
    }
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
module.exports = auth;
